import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import SibApiV3Sdk from "sib-api-v3-sdk";

const PORT = 5000;
const CONFIRMATION_TEMPLATE_ID = 7;

dotenv.config();
const app = express();

// Firebase setup

// create application/json parser
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

// SEND FORM SUBMISSION CONFIRMATION EMAIL
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

app.post("/send-confirmation-email", (req, res) => {
  sendSmtpEmail = {
    to: [
      {
        email: "testmail@example.com",
        name: "John Doe",
      },
    ],
    templateId: CONFIRMATION_TEMPLATE_ID,
    params: {
      name: "John",
      surname: "Doe",
    },
    headers: {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    },
  };
});
