const express = require("express");
const next = require("next");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config({ path: "../.env" });

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const prisma = new PrismaClient();

app.prepare().then(async () => {
  const server = express();

  // Middleware untuk parsing JSON dan CORS
  server.use(express.json());
  server.use(cors());

  // Rute API yang spesifik ditangani oleh Express.js
  // Middleware ini harus diletakkan sebelum handler Next.js
  server.use("/api/employees", employeeRoutes);

  // Bagian ini adalah kuncinya.
  // Express.js akan Meneruskan SEMUA permintaan yang TIDAK cocok
  // dengan rute di atas (seperti /api/employees) ke Next.js.
  server.use((req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`✅ Server ready on http://localhost:${PORT}`);
  });
});
