import { Schema } from "mongoose";

export const sessionSchema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    // duration: { type: Number, required: true }, // in minutes
    // date: { type: Date, required: true }
    localDate: { type: String, required: true }, // in ISO format YYYY-MM-DD
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)