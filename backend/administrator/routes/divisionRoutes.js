const express = require("express");
const router = express.Router();
const divisionController = require("../controllers/divisionController");

router.get("/", divisionController.getAll);
router.post("/", divisionController.create);
router.put("/:id", divisionController.update);

module.exports = router;
