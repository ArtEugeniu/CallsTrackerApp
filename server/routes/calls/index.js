import { Router } from "express";
import getAll from "./getAll.js";
import getById from "./getById.js";
import create from "./create.js";
import update from "./update.js";
import remove from "./delete.js";
import stats from "./stats.js";

const router = Router();

router.get("/", getAll);
router.get("/stats", stats); 
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;