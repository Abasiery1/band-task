import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    industry: { type: String, required: true },
    yearFounded: { type: Number, required: true },
    numberOfLocations: { type: Number, required: true },
    website: { type: String }
  },
  { strict: true }
);

export const Brand = mongoose.model("Brand", brandSchema);