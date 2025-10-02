const employeeTypeModel = require("../models/employeeTypeModel");

const employeeTypeController = {
  // GET All
  getAll: async (req, res) => {
    try {
      const types = await employeeTypeModel.findMany();
      res.json(types);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch employee types." });
    }
  },

  // POST Create
  create: async (req, res) => {
    try {
      const { name, status } = req.body;
      if (!name || !status)
        return res.status(400).json({ error: "Name and status are required." });

      const newType = await employeeTypeModel.create({
        data: { name, status },
      });
      res.status(201).json(newType);
    } catch (err) {
      if (err.code === "P2002") {
        return res
          .status(400)
          .json({ error: "Employee Type name already exists." });
      }
      res.status(400).json({ error: "Failed to create employee type." });
    }
  },

  // PUT Update
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, status } = req.body;

      const updatedType = await employeeTypeModel.update({
        where: { id },
        data: { name, status },
      });
      res.json(updatedType);
    } catch (err) {
      res.status(400).json({ error: "Failed to update employee type." });
    }
  },
  // DELETE
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await employeeTypeModel.delete({ where: { id } });
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: "Failed to delete employee type." });
    }
  },
};

module.exports = employeeTypeController;
