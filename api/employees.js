import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees.js";
const router = express.Router();
function isPositiveInteger(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
}
function hasRequiredFields(body) {
  return body && body.name && body.birthday && body.salary !== undefined;
}
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required");
    }
    if (!hasRequiredFields(req.body)) {
      return res.status(400).send("Missing required fields");
    }
    const { name, birthday, salary } = req.body;
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isPositiveInteger(id)) {
      return res.status(400).send("ID must be a positive integer");
    }
    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required");
    }
    if (!hasRequiredFields(req.body)) {
      return res.status(400).send("Missing required fields");
    }
    if (!isPositiveInteger(id)) {
      return res.status(400).send("ID must be a positive integer");
    }
    const { name, birthday, salary } = req.body;
    const employee = await updateEmployee({ id, name, birthday, salary });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
     if (!isPositiveInteger(id)) {
      return res.status(400).send("ID must be a positive integer");
     }
    const employee = await deleteEmployee(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
export default router;
// TODO: this file!
