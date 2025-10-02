const express = require("express");
const router = express.Router();
const unitController = require("../controllers/unitController");

router.get("/", unitController.getAll);
router.post("/", unitController.create);
router.put("/:id", unitController.update);

module.exports = router;
