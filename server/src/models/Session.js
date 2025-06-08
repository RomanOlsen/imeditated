import { Schema } from "mongoose";

export const sessionSchema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    // duration: { type: Number, required: true }, // in minutes
    // date: { type: Date, required: true }
    localDate: { type: String, required: true }, // in ISO format YYYY-MM-DD

    method: { type: String, maxLength: 50, required: false },
    duration: { type: Number, max: 1440, required: false }, // in minutes
    note: { type: String, maxLength: 150, required: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)