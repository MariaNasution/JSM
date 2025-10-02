const express = require("express");
const router = express.Router();
const jobLevelController = require("../controllers/jobLevelController");

router.get("/", jobLevelController.getAll);
router.post("/", jobLevelController.create);
router.put("/:id", jobLevelController.update);
router.delete("/:id", jobLevelController.delete);

module.exports = router;
