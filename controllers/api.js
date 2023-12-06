import {
  createContactOnHubSpot,
  createContactOnBrevo,
  editContactOnHubSpot,
} from "../utils/contact.js";
import {
  sendForm,
  sendFormEmail,
  sendInvitationEmail,
} from "../utils/email.js";
import { createInviteMessage } from "../utils/slackBot.js";

export const submitWebsiteForm = async (req, res) => {
  const { name, email, message } = req.body;

  await sendForm(name, email, message);
  await createContactOnHubSpot(name, email);
  await createContactOnBrevo(name, email);
  await sendFormEmail(email);

  res.sendStatus(200);
};

export const submitIntakeForm = async (req, res) => {
  const data = req.body;
  const { email } = req.body;

  await sendInvitationEmail(email);
  await editContactOnHubSpot(data);

  res.sendStatus(200);
};

export const userJoinWorkspace = async (req, res) => {
  const { challenge } = req.body;

  res.send({ challenge });
};
