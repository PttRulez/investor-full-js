import { Exchange, OpinionType, SecurityType } from '@contracts/other/enums';
import { Expert } from 'src/expert/expert.model';
import { PrismaOpinion, PrismaOpinionWithRelations } from './types';
import { IOpinionResponse } from '@contracts/responses/opinion';

export class Opinion {
  date: Date;
  exchange: Exchange;
  expertId: number;
  expert?: Expert;
  text: string;
  id: number;
  securityType: SecurityType;
  securityId: number;
  sourceLink?: string;
  type: OpinionType;

  constructor(opinion: PrismaOpinion);
  constructor(opinion: PrismaOpinionWithRelations) {
    this.date = opinion.date;
    this.exchange = opinion.exchange as Exchange;
    this.expertId = opinion.expertId;
    this.expert = opinion.expert ? new Expert(opinion.expert) : null;
    this.text = opinion.text;
    this.id = opinion.id;
    this.securityType = opinion.securityType as SecurityType;
    this.securityId = opinion.securityId;
    this.sourceLink = opinion.sourceLink ?? null;
    this.type = opinion.type as OpinionType;
  }

  toJSON(): IOpinionResponse {
    return this;
  }
}
