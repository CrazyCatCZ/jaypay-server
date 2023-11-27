import express from "express";

import { submitWebsiteForm, testController } from "../controllers/api.js";

const router = express.Router();

router.post("/submit-website-form", submitWebsiteForm);
router.post("/test-controller", testController);

export default router;
