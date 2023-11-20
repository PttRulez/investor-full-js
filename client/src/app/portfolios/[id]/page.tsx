'use client';

import { useState } from 'react';
import investorService from '@/axios/investor/investor.service';
import DealsTable from '@/app/portfolios/components/DealsTable';
import PortfolioTable from '../components/PortfolioTable/PortfolioTable';
import { Dialog, SelectChangeEvent, Tab } from '@mui/material';
import CreateDealForm from '../components/DealForm/CreateDealForm';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { PortfolioTransactionsMap } from '../components/PortfolioTable/PortfolioTableToolbar';
import { DealType } from '@contracts/other/enums';
import CashoutForm from '../components/TransactionForm/CashoutForm';
import DepositForm from '../components/TransactionForm/DepositForm';
import TransactionsTable from '../components/TransactionsTable';

export default function Portfolio({ params }: { params: { id: string } }) {
  const [openModal, setOpenModal] = useState<PortfolioTransactionsMap | false>(
    false,
  );
  const [activeTab, setActiveTab] = useState<string>('portfolio');

  const client = useQueryClient();
  const { data: portfolio } = useQuery({
    queryKey: ['portfolio', parseInt(params.id)],
    queryFn: async () => {
      const portfolio = await investorService.portfolio.getPortfolio(params.id);
      return portfolio;
    },
    onSuccess: () => {
      client.invalidateQueries(['prices']);
    },
    // initialData: initPortfolio,
  });

  const chooseTransactionHandler = (e: SelectChangeEvent) => {
    switch (e.target.value) {
      case PortfolioTransactionsMap.buy:
        setOpenModal(PortfolioTransactionsMap.buy);
        break;
      case PortfolioTransactionsMap.cashout:
        setOpenModal(PortfolioTransactionsMap.cashout);
        break;
      case PortfolioTransactionsMap.deposit:
        setOpenModal(PortfolioTransactionsMap.deposit);
        break;
      case PortfolioTransactionsMap.sell:
        setOpenModal(PortfolioTransactionsMap.sell);
        break;
    }
  };

  return (
    <>
      <TabContext value={activeTab}>
        <TabList onChange={(_, v) => setActiveTab(v)}>
          <Tab label="Портфолио" value="portfolio"></Tab>
          <Tab label="Сделки" value="deals"></Tab>
          <Tab label="Транзакции" value="transactions"></Tab>
        </TabList>
        <TabPanel value="portfolio">
          {portfolio && (
            <PortfolioTable
              onChooseTransaction={chooseTransactionHandler}
              portfolio={portfolio}
            />
          )}
        </TabPanel>
        <TabPanel value="deals">
          {portfolio && <DealsTable deals={portfolio.deals ?? []} />}
        </TabPanel>
        <TabPanel value="transactions">
          {portfolio && (
            <TransactionsTable
              portfolioId={portfolio.id}
              transactions={portfolio.transactions ?? []}
            />
          )}
        </TabPanel>
      </TabContext>

      {/* <AddNewButton onClick={() => setCreateDeal(true)} /> */}

      <Dialog open={!!openModal} onClose={() => setOpenModal(false)}>
        {openModal &&
          {
            [PortfolioTransactionsMap.buy]: (
              <CreateDealForm
                afterSuccessfulSubmit={() => setOpenModal(false)}
                dealType={DealType.BUY}
                portfolioId={Number(params.id)}
              />
            ),
            [PortfolioTransactionsMap.cashout]: (
              <CashoutForm
                afterSuccessfulSubmit={() => setOpenModal(false)}
                portfolioId={Number(params.id)}
              />
            ),
            [PortfolioTransactionsMap.deposit]: (
              <DepositForm
                afterSuccessfulSubmit={() => setOpenModal(false)}
                portfolioId={Number(params.id)}
              />
            ),
            [PortfolioTransactionsMap.sell]: (
              <CreateDealForm
                afterSuccessfulSubmit={() => setOpenModal(false)}
                dealType={DealType.SELL}
                portfolioId={Number(params.id)}
              />
            ),
          }[openModal]}
      </Dialog>
    </>
  );
}
