const employeeStatusModel = require("../models/employeeStatusModel");

const employeeStatusController = {
  // GET All
  getAll: async (req, res) => {
    try {
      const statuses = await employeeStatusModel.findMany();
      res.json(statuses);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch employee statuses." });
    }
  },

  // POST Create
  create: async (req, res) => {
    try {
      const { name, status } = req.body;
      if (!name || !status)
        return res.status(400).json({ error: "Name and status are required." });

      const newStatus = await employeeStatusModel.create({
        data: { name, status },
      });
      res.status(201).json(newStatus);
    } catch (err) {
      if (err.code === "P2002") {
        return res
          .status(400)
          .json({ error: "Employee Status name already exists." });
      }
      res.status(400).json({ error: "Failed to create employee status." });
    }
  },

  // PUT Update
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, status } = req.body;

      const updatedStatus = await employeeStatusModel.update({
        where: { id },
        data: { name, status },
      });
      res.json(updatedStatus);
    } catch (err) {
      res.status(400).json({ error: "Failed to update employee status." });
    }
  },
  // DELETE
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await employeeStatusModel.delete({ where: { id } });
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: "Failed to delete employee status." });
    }
  },
};

module.exports = employeeStatusController;
