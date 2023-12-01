import axios from "axios";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";

const CONFIRMATION_EMAIL_TEMPLATE_ID = 7;
const INVITATION_EMAIL_TEMPLATE_ID = 9;

dotenv.config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const transactionalApiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendForm = async (name, email, message) => {
  await axios
    .post("https://api.web3forms.com/submit", {
      name,
      email,
      message,
      access_key: process.env.FORM_API_KEY,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const sendFormEmail = async (email) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.templateId = CONFIRMATION_EMAIL_TEMPLATE_ID;
  sendSmtpEmail.to = [{ email }];

  await transactionalApiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API called successfully. Returned data: " + data);
    },
    (error) => {
      console.error(error);
    }
  );
};

export const sendInvitationEmail = async (email) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.templateId = INVITATION_EMAIL_TEMPLATE_ID;
  sendSmtpEmail.to = [{ email }];

  await transactionalApiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API called successfully. Returned data: " + data);
    },
    (error) => {
      console.error(error);
    }
  );
};
