const express = require("express");
const next = require("next");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const branchRoutes = require("./routes/branchRoutes");
const divisionRoutes = require("./routes/divisionRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const unitRoutes = require("./routes/unitRoutes");
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

  // Rute API yang spesifik ditangani oleh Express.js (HARUS di atas handle Next.js)
  server.use("/api/employees", employeeRoutes);
  server.use("/api/branches", branchRoutes);
  server.use("/api/divisions", divisionRoutes);
  server.use("/api/departments", departmentRoutes);
  server.use("/api/units", unitRoutes);

  // Handler untuk halaman Next.js
  server.use((req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`✅ Server ready on http://localhost:${PORT}`);
  });
});
