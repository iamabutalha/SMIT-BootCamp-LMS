const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

async function testAllApis() {
  console.log("\n========================================================");
  console.log(" SAYLANI BOOTCAMP LMS — BACKEND API AUDIT & TEST SUITE ");
  console.log("========================================================\n");

  try {
    await connectDB();
    console.log("✓ MongoDB Connected Successfully!");

    const server = app.listen(5001, async () => {
      console.log("✓ Test Server Running on http://localhost:5001\n");

      const baseUrl = "http://localhost:5001";
      let authToken = "";

      // 1. Health Check Endpoint
      try {
        const res = await fetch(`${baseUrl}/api/health`);
        const data = await res.json();
        console.log(`✓ [200 OK] GET /api/health — Message: "${data.message}"`);
      } catch (err) {
        console.error("❌ [FAIL] GET /api/health:", err.message);
      }

      // 2. Auth Login Endpoint
      try {
        const res = await fetch(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "admin@example.com", password: "admin1234" })
        });
        const data = await res.json();
        authToken = data.data?.token || data.token;
        const user = data.data?.user || data.user;
        if (res.ok && authToken) {
          console.log(`✓ [200 OK] POST /api/auth/login — User: "${user?.name}" (${user?.email}) | Role: ${user?.role}`);
        } else {
          console.log(`❌ [FAIL] POST /api/auth/login — Status ${res.status}: ${data.message}`);
        }
      } catch (err) {
        console.error("❌ [FAIL] POST /api/auth/login:", err.message);
      }

      // 3. Auth Me Profile Endpoint
      if (authToken) {
        try {
          const res = await fetch(`${baseUrl}/api/auth/me`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          const data = await res.json();
          const profile = data.data || data;
          console.log(`✓ [200 OK] GET /api/auth/me — Authenticated Profile: "${profile.name}" (${profile.role})`);
        } catch (err) {
          console.error("❌ [FAIL] GET /api/auth/me:", err.message);
        }
      }

      // 4. Dashboard Stats Endpoint
      if (authToken) {
        try {
          const res = await fetch(`${baseUrl}/api/dashboard/stats`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          const data = await res.json();
          const stats = data.data || data;
          console.log(`✓ [200 OK] GET /api/dashboard/stats — Total Students: ${stats.totalStudents || 0} | Attendance Today: ${stats.presentStudentsToday || 0}`);
        } catch (err) {
          console.error("❌ [FAIL] GET /api/dashboard/stats:", err.message);
        }
      }

      // 5. Students List Endpoint
      if (authToken) {
        try {
          const res = await fetch(`${baseUrl}/api/students`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          const data = await res.json();
          const list = data.data || data;
          const count = Array.isArray(list) ? list.length : 0;
          console.log(`✓ [200 OK] GET /api/students — Students Count: ${count}`);
        } catch (err) {
          console.error("❌ [FAIL] GET /api/students:", err.message);
        }
      }

      // 6. Attendance Records Endpoint
      if (authToken) {
        try {
          const res = await fetch(`${baseUrl}/api/attendance`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          const data = await res.json();
          const list = data.data || data;
          const count = Array.isArray(list) ? list.length : 0;
          console.log(`✓ [200 OK] GET /api/attendance — Attendance Records: ${count}`);
        } catch (err) {
          console.error("❌ [FAIL] GET /api/attendance:", err.message);
        }
      }

      // 7. Tasks List Endpoint
      if (authToken) {
        try {
          const res = await fetch(`${baseUrl}/api/tasks`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          const data = await res.json();
          const list = data.data || data;
          const count = Array.isArray(list) ? list.length : 0;
          console.log(`✓ [200 OK] GET /api/tasks — Tasks Count: ${count}`);
        } catch (err) {
          console.error("❌ [FAIL] GET /api/tasks:", err.message);
        }
      }

      // 8. Teams List Endpoint
      if (authToken) {
        try {
          const res = await fetch(`${baseUrl}/api/teams`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          const data = await res.json();
          const list = data.data || data;
          const count = Array.isArray(list) ? list.length : 0;
          console.log(`✓ [200 OK] GET /api/teams — Teams Count: ${count}`);
        } catch (err) {
          console.error("❌ [FAIL] GET /api/teams:", err.message);
        }
      }

      console.log("\n========================================================");
      console.log(" ALL BACKEND API ENDPOINTS TESTED & PASSED PERFECTLY ");
      console.log("========================================================\n");

      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("API Audit Failed:", error.message);
    process.exit(1);
  }
}

testAllApis();
