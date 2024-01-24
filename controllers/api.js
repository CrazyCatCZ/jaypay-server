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
//import { inviteToSlack } from "../utils/slack.js";

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
  const { email } = data;

  await sendInvitationEmail(email);
  await editContactOnHubSpot(data);
  //await inviteToSlack(data);

  res.sendStatus(200);
};
