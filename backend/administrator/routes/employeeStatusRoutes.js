const express = require("express");
const router = express.Router();
const employeeStatusController = require("../controllers/employeeStatusController");

router.get("/", employeeStatusController.getAll);
router.post("/", employeeStatusController.create);
router.put("/:id", employeeStatusController.update);
router.delete("/:id", employeeStatusController.delete);

module.exports = router;
