import { IPortfolioPositionsResponse, IPositionResponse, MoexMarket } from '@contracts/responses';
import { Deal } from 'src/deal/deal.model';
import { MoexApi } from './moex-api.service';
import { MoexBondRepository } from './moex.bond-repository';
import { MoexShareRepository } from './moex.share-repository';
import { IMoexApiResponseCurrentPrices } from './types';
import { DealType } from '@contracts/other/enums';

export class MoexPositions {
  bonds: Array<IPositionResponse> = [];
  bondDeals: Deal[];
  bondsTotal: number = 0;
  private moexApi: MoexApi;
  private moexBondsRepo: MoexBondRepository;
  private moexSharesRepo: MoexShareRepository;
  shares: Array<IPositionResponse> = [];
  shareDeals: Deal[];
  sharesTotal: number = 0;

  constructor(
    moexDeals: { bonds: Deal[]; shares: Deal[] },
    moexApi: MoexApi,
    moexBondsRepo: MoexBondRepository,
    moexSharesRepo: MoexShareRepository,
  ) {
    this.bondDeals = moexDeals.bonds;
    this.shareDeals = moexDeals.shares;
    this.moexApi = moexApi;
    this.moexBondsRepo = moexBondsRepo;
    this.moexSharesRepo = moexSharesRepo;
  }

  async calculateResults() {
    await this.calculateBondsResults();
    await this.calculateSharesResults();
  }

  async calculateBondsResults(): Promise<void> {
    if (this.bondDeals.length === 0) return;

    // receiving bond prices from ISS MOEX API
    const bondTickersString: string = this.bondDeals.map(d => d.ticker).join(',');
    const bondPrices: IMoexApiResponseCurrentPrices = await this.moexApi.getStocksCurrentPrices(
      MoexMarket.bonds,
      bondTickersString,
    );

    // receiving bonds models from repo by securityIds from deals
    const bondIdsArray = Array.from(new Set(this.bondDeals.map(d => d.securityId)));
    const moexBondModels = await this.moexBondsRepo.getBulk(bondIdsArray);

    const bonds: Record<string, IPositionResponse> = {};

    // calculating amount of securities for each position
    this.bondDeals.forEach(d => {
      if (!bonds[d.ticker]) {
        bonds[d.ticker] = { amount: 0 } as IPositionResponse;
      }
      bonds[d.ticker].amount += d.type === DealType.BUY ? d.amount : -d.amount;
    });

    // adding currentPrices to positions
    moexBondModels.forEach(bond => {
      const { amount } = bonds[bond.ticker];
      const currentPrice = (bonds[bond.ticker].currentPrice = bondPrices.securities.data.find(
        priceData => priceData[0] === bond.ticker && priceData[1] === bond.board,
      )[2]);
      const total = currentPrice * amount;

      bonds[bond.ticker] = {
        amount,
        currentPrice,
        total,
        security: bond.toJSON(),
      };
    });

    this.bonds = Object.values(bonds);
    this.bondsTotal = this.bonds.reduce<number>((acc: number, p: IPositionResponse) => acc + p.total, 0);
  }

  async calculateSharesResults(): Promise<void> {
    if (this.shareDeals.length === 0) return;

    // receiving share prices from ISS MOEX API
    const shareTickersString: string = this.shareDeals.map(d => d.ticker).join(',');
    const sharePrices: IMoexApiResponseCurrentPrices = await this.moexApi.getStocksCurrentPrices(
      MoexMarket.shares,
      shareTickersString,
    );

    // receiving bonds models from repo by securityIds from deals
    const shareIdsArray = Array.from(new Set(this.shareDeals.map(d => d.securityId)));
    const moexShareModels = await this.moexSharesRepo.getBulk(shareIdsArray);

    const shares: Record<string, IPositionResponse> = {};

    this.shareDeals.forEach(d => {
      if (!shares[d.ticker]) {
        shares[d.ticker] = { amount: 0 } as IPositionResponse;
      }
      shares[d.ticker].amount += d.type === DealType.BUY ? d.amount : -d.amount;
    });

    moexShareModels.forEach(share => {
      const { amount } = shares[share.ticker];
      const currentPrice = (shares[share.ticker].currentPrice = sharePrices.securities.data.find(
        priceData => priceData[0] === share.ticker && priceData[1] === share.board,
      )[2]);
      const total = currentPrice * amount;

      shares[share.ticker] = {
        amount,
        currentPrice,
        total,
        security: share.toJSON(),
      };
    });

    this.shares = Object.values(shares);
    this.sharesTotal = this.shares.reduce<number>((acc: number, p: IPositionResponse) => acc + p.total, 0);
  }

  toJSON(): IPortfolioPositionsResponse {
    return {
      allPositions: this.bonds.concat(this.shares),
      bondPositions: this.bonds,
      bondsTotal: this.bondsTotal,
      sharePositions: this.shares,
      sharesTotal: this.sharesTotal,
    };
  }
}
