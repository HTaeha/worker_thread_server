import express from "express";
import * as schedulesController from "../controllers/schedules"

const schedules = express.Router();

schedules.post("/category", schedulesController.runCategory);
schedules.post("/search", schedulesController.runSearch);
// schedules.put("/:schedulesID", schedulesController.updateItems);
// schedules.delete("/:schedulesID", schedulesController.deleteItems);

// schedules.get("/search", schedulesController.getSearchItem)

export = schedules;