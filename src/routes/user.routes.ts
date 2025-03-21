import express from "express";

import { getAllUsers, signup } from "../controllers/user.controller";
import { hashPassword } from "../middleware/password.middleware";

const router = express.Router();

router.post("/signup", hashPassword, signup);
router.get("/", getAllUsers);

export default router;
