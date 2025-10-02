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
};

module.exports = unitController;
