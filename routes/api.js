import express from "express";

import {
  submitWebsiteForm,
  submitIntakeForm,
  userJoinWorkspace,
} from "../controllers/api.js";

const router = express.Router();

router.post("/submit-website-form", submitWebsiteForm);
router.post("/submit-intake-form", submitIntakeForm);
router.post("/user-join-workspace", userJoinWorkspace);

export default router;
