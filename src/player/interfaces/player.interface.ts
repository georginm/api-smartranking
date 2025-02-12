import { Document } from 'mongoose';

export interface Player extends Document {
  readonly _id: string;
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  positionRanking: number;
  urlPlayerPhoto: string;
}
