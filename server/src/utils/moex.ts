import { SecurityType } from '@contracts/other/enums';
import { MoexMarket } from '@contracts/index';

export const moexMarketToSecType = (market: MoexMarket): SecurityType => {
  if (market === MoexMarket.shares) {
    return SecurityType.SHARE;
  } else {
    return SecurityType.BOND;
  }
};
