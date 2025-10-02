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
};

module.exports = branchController;
