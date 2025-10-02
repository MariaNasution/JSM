const express = require("express");
const router = express.Router();
const employeeTypeController = require("../controllers/employeeTypeController");

router.get("/", employeeTypeController.getAll);
router.post("/", employeeTypeController.create);
router.put("/:id", employeeTypeController.update);
router.delete("/:id", employeeTypeController.delete);

module.exports = router;
