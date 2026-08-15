const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const { nodeEnv } = require("../config/env");

async function seedAdmin() {
  await connectDB();

  const name = process.env.ADMIN_NAME || "Bootcamp Admin";
  const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!password || password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters");
  }

  const existing = await Admin.findOne({ email });

  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }

  await Admin.create({
    name,
    email,
    password
  });

  console.log(`Admin created for ${nodeEnv}: ${email}`);
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
