const express = require("express");
const next = require("next");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const prisma = new PrismaClient();

app.prepare().then(async () => {
  const server = express();

  // ==============================
  // HANDLE NEXT.JS PAGES
  // ==============================
  server.use((req, res) => {
    return handle(req, res);
  });

  
  // ==============================
  // API ROUTES (Express + Prisma)
  // ==============================

  // Get all users
  server.get("/api/users", async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Create a new user
  server.post("/api/users", async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = await prisma.user.create({
        data: { name, email },
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==============================
  // HANDLE NEXT.JS PAGES
  // ==============================
  server.use((req, res) => {
    return handle(req, res);
  });

  // ==============================
  // START SERVER
  // ==============================
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`✅ Server ready on http://localhost:${PORT}`);
  });
});
