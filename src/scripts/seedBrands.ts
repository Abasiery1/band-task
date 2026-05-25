import { connectDB } from "../config/db";
import { Brand } from "../models/brand.model";
import { faker } from "@faker-js/faker";

const MIN_YEAR = 1900;

const seed = async () => {
  await connectDB();

  const brands = [];

  for (let i = 0; i < 10; i++) {
    const brand = {
      name: faker.company.name(),
      industry: faker.commerce.department(),
      yearFounded: faker.number.int({
        min: MIN_YEAR,
        max: 2024
      }),
      numberOfLocations: faker.number.int({
        min: 1,
        max: 500
      }),
      website: faker.internet.url()
    };

    brands.push(brand);
  }

  await Brand.insertMany(brands);

  console.log("✅ 10 brands seeded successfully");
  process.exit();
};

seed();