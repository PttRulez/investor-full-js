import { MoexBond } from '../moexbond.model';
import { MoexShare } from '../moexshare.model';

export * from './iss-api';
export * from './repository';

export type MoexSecurity = MoexBond | MoexShare;
