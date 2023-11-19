import { sendForm, sendEmail, createContact } from "../utils/email.js";

export const submitWebsiteForm = async (req, res) => {
  const { name, email, message } = req.body;

  await sendForm(name, email, message);
  await createContact(name, email);
  await sendEmail(email);

  res.status(200);
};
