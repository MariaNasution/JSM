const jobLevelModel = require("../models/jobLevelModel");

const jobLevelController = {
  // GET All
  getAll: async (req, res) => {
    try {
      const levels = await jobLevelModel.findMany();
      res.json(levels);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch job levels." });
    }
  },

  // POST Create
  create: async (req, res) => {
    try {
      const { name, status } = req.body;
      if (!name || !status)
        return res.status(400).json({ error: "Name and status are required." });

      const newLevel = await jobLevelModel.create({
        data: { name, status },
      });
      res.status(201).json(newLevel);
    } catch (err) {
      if (err.code === "P2002") {
        return res
          .status(400)
          .json({ error: "Job Level name already exists." });
      }
      res.status(400).json({ error: "Failed to create job level." });
    }
  },

  // PUT Update
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, status } = req.body;

      const updatedLevel = await jobLevelModel.update({
        where: { id },
        data: { name, status },
      });
      res.json(updatedLevel);
    } catch (err) {
      res.status(400).json({ error: "Failed to update job level." });
    }
  },
  // DELETE
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await jobLevelModel.delete({ where: { id } });
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: "Failed to delete job level." });
    }
  },
};

module.exports = jobLevelController;
