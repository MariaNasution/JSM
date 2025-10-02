const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

router.get("/", departmentController.getAll);
router.post("/", departmentController.create);
router.put("/:id", departmentController.update);

module.exports = router;
