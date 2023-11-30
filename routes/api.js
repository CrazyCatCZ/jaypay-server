import express from "express";

import { submitWebsiteForm, submitIntakeForm } from "../controllers/api.js";

const router = express.Router();

router.post("/submit-website-form", submitWebsiteForm);
router.post("/submit-intake-form", submitIntakeForm);

export default router;
