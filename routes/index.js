import { Router } from "express";
import MovieRouter from "./MovieRoute.js";
import CastRouter from "./CastRoute.js";

const router = Router();

router.use("/api/movie", MovieRouter);
router.use("/api/cast", CastRouter);

export default router;
