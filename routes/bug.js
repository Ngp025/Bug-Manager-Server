import express from "express";
const router = express.Router();

import {
  assignBug,
  deleteBug,
  getBugs,
  filterBugs,
  updateBug,
} from "../controllers/BugController.js";

router.post("/", assignBug);
router.get("/", getBugs);
router.get("/:formData", filterBugs);
router.patch("/:id", updateBug);
router.delete("/:id", deleteBug);

export default router;
