const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");

router.get("/", branchController.getAll);
router.post("/", branchController.create);
router.put("/:id", branchController.update);

module.exports = router;
