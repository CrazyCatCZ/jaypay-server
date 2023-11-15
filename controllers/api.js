import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

const CONFIRMATION_TEMPLATE_ID = 7;
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

let contactsApiInstance = new SibApiV3Sdk.ContactsApi();
const transactionalApiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendConfirmationEmail = (req, res) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.templateId = CONFIRMATION_TEMPLATE_ID;
  sendSmtpEmail.to = [{ email: req }];

  transactionalApiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API called successfully. Returned data: " + data);
    },
    (error) => {
      console.error(error);
    }
  );
};
