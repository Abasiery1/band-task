import { connectDB } from "../config/db";
import { Brand } from "../models/brand.model";

const MIN_YEAR = 1900;

const transform = async () => {
  await connectDB();

  const brands = await Brand.find();

  for (const brand of brands) {
    let updated: any = {};

    // -------------------------
    // 1. NAME FIX
    // -------------------------
    updated.name =
      brand.get("name") ||
      brand.get("brandName") ||
      brand.get("title") ||
      "Unknown Brand";

    // -------------------------
    // 2. INDUSTRY FIX
    // -------------------------
    updated.industry =
      brand.get("industry") ||
      brand.get("sector") ||
      "Unknown";

    // -------------------------
    // 3. YEAR FOUNDED FIX
    // -------------------------
    let year =
      brand.get("yearFounded") ||
      brand.get("foundedYear") ||
      brand.get("year");

    updated.yearFounded =
      typeof year === "number" && year >= MIN_YEAR
        ? year
        : MIN_YEAR;

    // -------------------------
    // 4. NUMBER OF LOCATIONS FIX
    // -------------------------
    let locations =
      brand.get("numberOfLocations") ||
      brand.get("locationsCount") ||
      brand.get("branches");

    updated.numberOfLocations =
      typeof locations === "number" ? locations : 1;

    // -------------------------
    // 5. WEBSITE FIX (optional)
    // -------------------------
    updated.website =
      brand.get("website") ||
      brand.get("url") ||
      null;

    // -------------------------
    // APPLY UPDATE IN PLACE
    // -------------------------
    await Brand.updateOne(
      { _id: brand._id },
      { $set: updated }
    );
  }

  console.log("✅ Transformation completed");
  process.exit();
};

transform();