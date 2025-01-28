import mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String },
    name: String,
    ranking: String,
    positionRanking: Number,
    urlPlayerPhoto: String,
  },
  { timestamps: true, collection: 'players' },
);
