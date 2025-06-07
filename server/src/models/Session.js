import { Schema } from "mongoose";

export const sessionSchema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    // duration: { type: Number, required: true }, // in minutes
    dateCompleted: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)