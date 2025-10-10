const unitModel = require("../models/unitModel");

const unitController = {
  // GET All (dengan menyertakan Department, Division, dan Branch)
  getAll: async (req, res) => {
    try {
      const units = await unitModel.findMany({
        include: { branch: true, division: true, department: true },
      });
      res.json(units);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch units." });
    }
  },

  // POST Create
  create: async (req, res) => {
    try {
      const { name, status, branchId, divisionId, departmentId } = req.body;
      if (!name || !status || !branchId || !divisionId || !departmentId)
        return res
          .status(400)
          .json({ error: "All required fields are missing." });

      const newUnit = await unitModel.create({
        data: {
          name,
          status,
          branchId: parseInt(branchId),
          divisionId: parseInt(divisionId),
          departmentId: parseInt(departmentId),
        },
      });
      res.status(201).json(newUnit);
    } catch (err) {
      if (err.code === "P2002") {
        return res
          .status(400)
          .json({ error: "Unit name already exists in this Department." });
      }
      res.status(400).json({ error: "Failed to create unit." });
    }
  },

  // PUT Update
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, status, branchId, divisionId, departmentId } = req.body;
      const data = { name, status };
      if (branchId) data.branchId = parseInt(branchId);
      if (divisionId) data.divisionId = parseInt(divisionId);
      if (departmentId) data.departmentId = parseInt(departmentId);

      const updatedUnit = await unitModel.update({
        where: { id },
        data,
      });
      res.json(updatedUnit);
    } catch (err) {
      res.status(400).json({ error: "Failed to update unit." });
    }
  },

  // 🔹 FIX: DELETE Unit Controller (Menangani Foreign Key Constraint)
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await unitModel.delete({ where: { id } });

      res.status(204).end();
    } catch (err) {
      console.error("Error deleting unit:", err);
      // Pengecekan error spesifik Foreign Key (P2003) - Jika Unit terhubung ke Employee
      if (err.code === "P2003") {
        return res.status(400).json({
          error:
            "P2003: Unit ini masih memiliki Employee yang terhubung. Harap hapus Employee tersebut terlebih dahulu.",
        });
      }
      if (err.code === "P2025") {
        return res.status(404).json({ error: "Unit tidak ditemukan." });
      }
      res.status(500).json({
        error: "Gagal menghapus data unit karena kesalahan database.",
      });
    }
  },
};

module.exports = unitController;
