import { Router } from "express";
import {
  deletecast,
  index,
  store,
  update,
} from "../controllers/CastController.js";

const router = Router();

router.post("/", store);

router.get("/", index);

router.put("/:id", update);

router.delete("/:id", deletecast);

export default router;
