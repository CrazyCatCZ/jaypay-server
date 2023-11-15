import express from "express";

import { sendConfirmationEmail, createNewContact } from "../controllers/api.js";

const router = express.Router();

router.post("/create-new-contact", createNewContact);
router.post("/send-confirmation-email", sendConfirmationEmail);

export default router;
