const branchModel = require("../models/branchModel");

const branchController = {
  // GET All
  getAll: async (req, res) => {
    try {
      const branches = await branchModel.findMany();
      res.json(branches);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch branches." });
    }
  },

  // POST Create
  create: async (req, res) => {
    try {
      const { name, status } = req.body;
      if (!name || !status)
        return res.status(400).json({ error: "Name and status are required." });

      const newBranch = await branchModel.create({
        data: { name, status },
      });
      res.status(201).json(newBranch);
    } catch (err) {
      // Error handling untuk unique constraint
      if (err.code === "P2002") {
        return res.status(400).json({ error: "Branch name already exists." });
      }
      res.status(400).json({ error: "Failed to create branch." });
    }
  },

  // PUT Update
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, status } = req.body;

      const updatedBranch = await branchModel.update({
        where: { id },
        data: { name, status },
      });
      res.json(updatedBranch);
    } catch (err) {
      res.status(400).json({ error: "Failed to update branch." });
    }
  },

  // 🔹 DELETE Controller (Mencakup penanganan FK P2003)
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await branchModel.delete({ where: { id } });

      // Respon sukses 204 (No Content)
      res.status(204).end();
    } catch (err) {
      console.error("Error deleting branch:", err);
      // Pengecekan error spesifik Foreign Key (P2003)
      if (err.code === "P2003") {
        return res.status(400).json({
          error:
            "P2003: Branch ini masih memiliki relasi aktif (Division, Department, atau Unit). Harap hapus relasi tersebut terlebih dahulu.",
        });
      }
      // Pengecekan jika ID tidak ditemukan
      if (err.code === "P2025") {
        return res.status(404).json({ error: "Branch tidak ditemukan." });
      }
      res.status(500).json({
        error: "Gagal menghapus data branch karena kesalahan server.",
      });
    }
  },
};

module.exports = branchController;
