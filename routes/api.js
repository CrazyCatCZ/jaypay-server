import express from "express";

import { sendTransactionalEmail } from "../controllers/api.js";

const router = express.Router();

router.post("/send-transactional-email", sendTransactionalEmail);

export default router;
