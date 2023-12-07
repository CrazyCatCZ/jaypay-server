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
import { createInviteMessageUser } from "../utils/slackBot.js";

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
  const { event } = req.body;

  if (event.type == "team_join" || event.type == "channel_created") {
    createInviteMessageUser(event);
  }

  res.sendStatus(200);
};
