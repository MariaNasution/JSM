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
};

module.exports = departmentController;
