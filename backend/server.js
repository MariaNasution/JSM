const express = require("express");
const next = require("next");
const cors = require("cors");
// Import Employee Routes
const employeeRoutes = require("./routes/employeeRoutes");
// Import Data Master Routes (Berkesinambungan)
const branchRoutes = require("./routes/branchRoutes");
const divisionRoutes = require("./routes/divisionRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const unitRoutes = require("./routes/unitRoutes");
// Import Data Master Routes (Simple CRUD)
const employeeTypeRoutes = require("./routes/employeeTypeRoutes");
const jobLevelRoutes = require("./routes/jobLevelRoutes");
const employeeStatusRoutes = require("./routes/employeeStatusRoutes");

const { PrismaClient } = require("@prisma/client");
require("dotenv").config({ path: "../.env" });

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const prisma = new PrismaClient();

app.prepare().then(async () => {
  const server = express();

  // Middleware
  server.use(express.json());
  server.use(cors());

  // =====================================
  // 🔹 API ROUTES (Ditangani Express.js)
  // =====================================
  server.use("/api/employees", employeeRoutes);
  server.use("/api/branches", branchRoutes);
  server.use("/api/divisions", divisionRoutes);
  server.use("/api/departments", departmentRoutes);
  server.use("/api/units", unitRoutes);
  server.use("/api/employee-types", employeeTypeRoutes);
  server.use("/api/job-levels", jobLevelRoutes);
  server.use("/api/employee-statuses", employeeStatusRoutes);

  // =====================================
  // 🔹 FALLBACK KE NEXT.JS HANDLER
  // =====================================
  // Ini menangani semua permintaan yang TIDAK cocok dengan rute API di atas.
  // Ini adalah metode yang paling stabil untuk menggabungkan Express dan Next.js.
  server.use((req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`✅ Server ready on http://localhost:${PORT}`);
  });
});
