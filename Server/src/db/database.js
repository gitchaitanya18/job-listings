"use strict";

const mongoose = require("mongoose");
const CONFIG = require("../config/config");

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
};

async function dbConnection() {
  try {
    await mongoose.connect(CONFIG.database.databaseUrl, mongooseOptions);

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);

  }
}

module.exports = dbConnection;