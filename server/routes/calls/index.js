import { Router } from "express";
import getAll from "./getAll.js";
import getById from "./getById.js";
import create from "./create.js";
import update from "./update.js";
import remove from "./delete.js";

const router = Router();

router.use("/", getAll);
router.use("/", getById);
router.use("/", create);
router.use("/", update);
router.use("/", remove);

export default router;