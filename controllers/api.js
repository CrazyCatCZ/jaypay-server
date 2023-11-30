import {
  sendForm,
  sendFormEmail,
  createContact,
  sendInvitationEmail,
} from "../utils/email.js";

export const submitWebsiteForm = async (req, res) => {
  const { name, email, message } = req.body;

  await sendForm(name, email, message);
  await createContact(name, email);
  await sendFormEmail(email);

  res.sendStatus(200);
};

export const submitIntakeForm = async (req, res) => {
  const { email } = req.body;

  await sendInvitationEmail(email);

  res.sendStatus(200);
};
