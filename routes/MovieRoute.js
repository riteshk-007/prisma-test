import { Router } from "express";
import {
  deleteMovie,
  index,
  searchMovie,
  store,
  update,
} from "../controllers/MovieController.js";

const router = Router();

router.post("/", store);

router.get("/", index);

router.put("/:id", update);

router.delete("/:id", deleteMovie);

router.get("/search", searchMovie);

export default router;
