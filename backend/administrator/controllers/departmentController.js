const departmentModel = require("../models/departmentModel");

const departmentController = {
  // GET All (dengan menyertakan Division dan Branch)
  getAll: async (req, res) => {
    try {
      const departments = await departmentModel.findMany({
        include: { branch: true, division: true },
      });
      res.json(departments);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch departments." });
    }
  },

  // POST Create
  create: async (req, res) => {
    try {
      const { name, status, branchId, divisionId } = req.body;
      if (!name || !status || !branchId || !divisionId)
        return res
          .status(400)
          .json({ error: "All required fields are missing." });

      const newDepartment = await departmentModel.create({
        data: {
          name,
          status,
          branchId: parseInt(branchId),
          divisionId: parseInt(divisionId),
        },
      });
      res.status(201).json(newDepartment);
    } catch (err) {
      if (err.code === "P2002") {
        return res
          .status(400)
          .json({ error: "Department name already exists in this Division." });
      }
      res.status(400).json({ error: "Failed to create department." });
    }
  },

  // PUT Update
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, status, branchId, divisionId } = req.body;
      const data = { name, status };
      if (branchId) data.branchId = parseInt(branchId);
      if (divisionId) data.divisionId = parseInt(divisionId);

      const updatedDepartment = await departmentModel.update({
        where: { id },
        data,
      });
      res.json(updatedDepartment);
    } catch (err) {
      res.status(400).json({ error: "Failed to update department." });
    }
  },

  // 🔹 FIX: DELETE Department Controller (Menangani Foreign Key Constraint)
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await departmentModel.delete({ where: { id } });

      res.status(204).end();
    } catch (err) {
      console.error("Error deleting department:", err);
      // Pengecekan error spesifik Foreign Key (P2003)
      if (err.code === "P2003") {
        return res.status(400).json({
          error:
            "P2003: Department ini masih memiliki relasi aktif (Unit atau Employee). Harap hapus data Unit/Employee terkait terlebih dahulu.",
        });
      }
      if (err.code === "P2025") {
        return res.status(404).json({ error: "Department tidak ditemukan." });
      }
      res.status(500).json({
        error: "Gagal menghapus data department karena kesalahan database.",
      });
    }
  },
};

module.exports = departmentController;
