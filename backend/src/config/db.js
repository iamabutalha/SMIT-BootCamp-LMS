const mongoose = require("mongoose");
const { mongoUri } = require("./env");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB error:", error.message);
  });

  await mongoose.connect(mongoUri);
}

module.exports = connectDB;
