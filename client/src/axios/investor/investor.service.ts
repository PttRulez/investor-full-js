import investorAxiosInstance from './config';
import InvestorAuth from './domains/auth';
import InvestorPortfolio from './domains/portfolio';
import InvestorDeal from './domains/deal';
import InvestorTransaction from './domains/transaction';

class InvestorService {
  private static instance: InvestorService;
  private readonly investorApi = investorAxiosInstance;

  public auth: InvestorAuth;
  public portfolio: InvestorPortfolio;
  public deal: InvestorDeal;
  public transaction: InvestorTransaction;

  constructor() {
    this.auth = new InvestorAuth(this.investorApi);
    this.deal = new InvestorDeal(this.investorApi);
    this.portfolio = new InvestorPortfolio(this.investorApi);
    this.transaction = new InvestorTransaction(this.investorApi);
  }

  // Singleton
  public static get(): InvestorService {
    if (!InvestorService.instance) {
      InvestorService.instance = new InvestorService();
    }
    return InvestorService.instance;
  }
}

const investorService = InvestorService.get();

export default investorService;
