const divisionModel = require("../models/divisionModel");

const divisionController = {
  // GET All (dengan menyertakan nama Branch)
  getAll: async (req, res) => {
    try {
      const divisions = await divisionModel.findMany({
        include: { branch: true }, // Untuk mendapatkan nama Branch
      });
      res.json(divisions);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch divisions." });
    }
  },

  // POST Create
  create: async (req, res) => {
    try {
      const { name, status, branchId } = req.body;
      if (!name || !status || !branchId)
        return res
          .status(400)
          .json({ error: "Name, status, and Branch ID are required." });

      const newDivision = await divisionModel.create({
        data: { name, status, branchId: parseInt(branchId) },
      });
      res.status(201).json(newDivision);
    } catch (err) {
      res.status(400).json({ error: "Failed to create division." });
    }
  },

  // PUT Update
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, status, branchId } = req.body;
      const data = { name, status };
      if (branchId) data.branchId = parseInt(branchId);

      const updatedDivision = await divisionModel.update({
        where: { id },
        data,
      });
      res.json(updatedDivision);
    } catch (err) {
      res.status(400).json({ error: "Failed to update division." });
    }
  },

  // 🔹 FUNGSI DELETE Division (FIXED: Menangani Foreign Key Constraint)
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await divisionModel.delete({ where: { id } });

      res.status(204).end();
    } catch (err) {
      console.error("Error deleting division:", err);
      // Pengecekan error spesifik Foreign Key (P2003)
      if (err.code === "P2003") {
        return res.status(400).json({
          error:
            "P2003: Division ini masih memiliki relasi aktif (Department atau Unit). Harap hapus relasi tersebut terlebih dahulu.",
        });
      }
      if (err.code === "P2025") {
        return res.status(404).json({ error: "Division tidak ditemukan." });
      }
      res.status(500).json({
        error: "Gagal menghapus data division karena kesalahan database.",
      });
    }
  },
};

module.exports = divisionController;
