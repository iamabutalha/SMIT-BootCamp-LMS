const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const Attendance = require("../models/Attendance");

async function fixAttendanceIndexes() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;
    const collection = db.collection("attendances");

    // Get all indexes
    console.log("\n📋 Current indexes:");
    const indexes = await collection.indexes();
    indexes.forEach((index) => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    // Drop old studentId index if it exists
    console.log("\n🗑️  Dropping old indexes...");
    try {
      await collection.dropIndex("studentId_1_date_1");
      console.log("✅ Dropped old index: studentId_1_date_1");
    } catch (err) {
      if (err.code === 27) {
        console.log("ℹ️  Index studentId_1_date_1 doesn't exist (that's ok)");
      } else {
        console.log("⚠️  Error dropping studentId_1_date_1:", err.message);
      }
    }

    // Remove any records with null student field
    console.log("\n🧹 Cleaning up invalid records...");
    const deleteResult = await collection.deleteMany({ 
      $or: [
        { student: null },
        { studentId: { $exists: true } }
      ]
    });
    console.log(`✅ Deleted ${deleteResult.deletedCount} invalid record(s)`);

    // Ensure correct indexes exist
    console.log("\n🔨 Creating correct indexes...");
    await Attendance.syncIndexes();
    console.log("✅ Indexes synchronized");

    // Verify new indexes
    console.log("\n📋 Final indexes:");
    const finalIndexes = await collection.indexes();
    finalIndexes.forEach((index) => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    console.log("\n✅ Attendance index fix completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing attendance indexes:", error);
    process.exit(1);
  }
}

// Run the fix
fixAttendanceIndexes();
