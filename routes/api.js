import express from "express";

import { submitWebsiteForm } from "../controllers/api.js";

const router = express.Router();

router.post("/submit-website-form", submitWebsiteForm);

export default router;
