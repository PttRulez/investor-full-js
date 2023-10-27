import { useEffect, useMemo, useState } from 'react';
import { moexService } from '@/axios/moex/moex.service';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useQueries, useQuery } from '@tanstack/react-query';
import investorService from '@/axios/investor';
import PortfolioTableFooter from './PortfolioTableFooter';
import { IPortfolioResponse } from '@contracts/responses';

const PortfolioTable = ({ portfolio }: { portfolio: IPortfolioResponse }) => {
  const columns = useMemo<MRT_ColumnDef<Position>[]>(
    () => [
      {
        header: 'Тикер',
        accessorKey: 'ticker',
      },
      {
        header: ' Тип',
        accessorKey: 'stockType',
        size: 10,
      },
      {
        header: 'Кол-во',
        accessorKey: 'amount',
        size: 50,
      },
      {
        header: 'Средняя цена',
        accessorKey: 'price',
      },
      {
        header: 'Стоимость закупки',
        accessorKey: 'total',
      },
      {
        header: 'Текущая цена',
        accessorKey: 'currentPrice',
      },
      {
        header: 'Текущая стоимость',
        accessorFn: position => position.total.toLocaleString(),
      },
    ],
    [],
  );

  // Приводим все сделки по одному активу к одной строке
  const positions: Position[] | null = useMemo(() => {
    if (!portfolio?.deals) return null;
    const positions = {};
    for (const deal of portfolio.deals) {
      if (!positions[deal.securityId]) {
        positions[deal.ticker] = { ...deal, total: deal.price * deal.amount };
      } else {
        const prev = { ...positions[deal.ticker] };
        const total = deal.amount * deal.price + prev.amount * prev.price;
        const amount = deal.amount + prev.amount;
        positions[deal.ticker].amount = amount;
        positions[deal.ticker].total = total;
        positions[deal.ticker].price = (total / amount).toFixed(2);
      }
    }
    return Object.values(positions);
  }, [portfolio.deals]);

  // Формируем массив кортежей. 1-й элемент это названия рынка (shares, bonds). 2-й элемент тикеры через запятую в одну
  // строку. Можно сформировать только если уже все позиции в портфеле известны
  const pricesRequest = useMemo(() => {
    if (!positions) return [];
    const obj = {};
    for (const position of positions) {
      if (obj[position.stockType]) {
        obj[position.stockType] += `,${position.ticker}`;
      } else {
        obj[position.stockType] = position.ticker;
      }
    }
    return Object.entries(obj);
  }, [positions]);

  // Просто получаем цены по всем активам. Запрос делаем только после того как сформировали строки запросов
  const pricesQueryResults = useQueries({
    queries: pricesRequest.map(([market, tickers]) => {
      return {
        queryKey: ['prices'],
        queryFn: async () => {
          const res = await moexService.getStocksInfo(market, tickers as string);
          return { market, prices: res.data.securities.data };
        },
        enabled: !!positions,
      };
    }),
  });

  const pricesLoaded = pricesQueryResults.every(q => q.isSuccess);

  // мапим позиции, добавляем текущие цены, считаем текущую стоимость позиции
  const positionsWithPrices: Position[] = useMemo(() => {
    if (!positions) return [];
    if (!pricesLoaded) return [];
    console.log('pricesLoaded');
    const prices = pricesQueryResults.reduce((acc, cur) => {
      acc[cur.data!.market] = cur.data!.prices;
      return acc;
    }, {});
    for (const position of positions) {
      // индекс 1 это board TQBR и прочие, 2 индекс - цена
      position.currentPrice = prices[position.stockType].find(
        p => p[0] === position.ticker && p[1] === position.board,
      )?.[2];
      position.total = Math.round(position.currentPrice * position.amount);
    }
    return positions;
  }, [pricesRequest, pricesLoaded]);
  positionsWithPrices[1]

  const totalPortfolioCost = useMemo(() => {
    return positionsWithPrices.reduce((prev, cur) => {
      return prev + cur.total;
    }, 0);
  }, [positionsWithPrices]);

  const sumOfDeposits = useMemo(() => {
    if (!portfolio) return 0;
    return portfolio.deposits.reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
  }, [portfolio]);

  const sumOfCashouts = useMemo(() => {
    if (!portfolio) return 0;
    return portfolio.cashouts.reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
  }, [portfolio]);

  const profitability = (((totalPortfolioCost + sumOfCashouts) / sumOfDeposits - 1) * 100).toFixed(2) + ' %';

  return (
    <>
      {pricesLoaded && (
        <MaterialReactTable
          enablePagination={false}
          data={positionsWithPrices}
          columns={columns}
          enableGrouping
          muiTablePaperProps={{ sx: { marginBottom: '100px' } }}
          renderBottomToolbar={() => (
            <PortfolioTableFooter
              cashoutsSum={sumOfCashouts}
              currentValue={totalPortfolioCost}
              depositsSum={sumOfDeposits}
              profitability={profitability}
            />
          )}
          initialState={{ expanded: true, grouping: ['stockType'] }}
        />
      )}
    </>
  );
};

export default PortfolioTable;
