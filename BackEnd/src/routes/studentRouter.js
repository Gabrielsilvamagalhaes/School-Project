import express from "express";
import studentController from "../controllers/StudentController";

import loginRequired from "../middlewares/loginRequired";
const router = express.Router();

router.get("/students", studentController.index);
router.get("/students/:id", studentController.show);
router.post("/students", loginRequired, studentController.create);
router.put("/students/:id", loginRequired, studentController.update);
router.delete("/students/:id", loginRequired, studentController.delete);

export default router;
