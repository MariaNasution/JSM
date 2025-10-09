const express = require("express");
const next = require("next");
const cors = require("cors");

const employeeRoutes = require("./administrator/routes/employeeRoutes");
const branchRoutes = require("./administrator/routes/branchRoutes");
const divisionRoutes = require("./administrator/routes/divisionRoutes");
const departmentRoutes = require("./administrator/routes/departmentRoutes");
const unitRoutes = require("./administrator/routes/unitRoutes");
const employeeTypeRoutes = require("./administrator/routes/employeeTypeRoutes");
const jobLevelRoutes = require("./administrator/routes/jobLevelRoutes");
const employeeStatusRoutes = require("./administrator/routes/employeeStatusRoutes");

const { PrismaClient } = require("@prisma/client");
require("dotenv").config({ path: "../.env" });

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const prisma = new PrismaClient();

app.prepare().then(async () => {
  const server = express();
  server.use(express.json());
  server.use(cors());

  server.use("/api/employees", employeeRoutes);
  server.use("/api/branches", branchRoutes);
  server.use("/api/divisions", divisionRoutes);
  server.use("/api/departments", departmentRoutes);
  server.use("/api/units", unitRoutes);
  server.use("/api/employee-types", employeeTypeRoutes);
  server.use("/api/job-levels", jobLevelRoutes);
  server.use("/api/employee-statuses", employeeStatusRoutes);

  server.use((req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`✅ Server ready on http://localhost:${PORT}`);
  });
});
