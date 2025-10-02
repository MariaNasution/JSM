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
};

module.exports = divisionController;
