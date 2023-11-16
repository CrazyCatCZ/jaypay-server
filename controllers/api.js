import { sendEmail, createContact } from "../utils/email.js";

export const sendTransactionalEmail = async (req, res) => {
  const { name, email } = req.body;

  await createContact(name, email);
  await sendEmail(email);

  res.status(200);
};
