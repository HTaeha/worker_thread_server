"use strict";
import express from "express";

import schedules from "./schedules"

// import { checkToken, getSession } from "../controllers/auth";

const router = express.Router();

// api.use("/auth", auth);

router.use("/schedules", schedules)

export = router;