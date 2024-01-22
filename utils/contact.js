import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";
import { Client } from "@hubspot/api-client";

dotenv.config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

let contactsApiInstance = new SibApiV3Sdk.ContactsApi();

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_API_KEY,
  numberOfApiCallRetries: 3,
});

export const createContactOnHubSpot = async (name, email) => {
  const contactObj = {
    properties: {
      firstname: name,
      email: email,
    },
  };
  await hubspotClient.crm.contacts.basicApi.create(contactObj);
};

export const createContactOnBrevo = async (name, email) => {
  let createContact = new SibApiV3Sdk.CreateContact();

  createContact = {
    attributes: {
      FIRSTNAME: name,
    },
    email: email,
  };

  contactsApiInstance.createContact(createContact).then(
    (data) => {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    (error) => {
      console.error(error);
    }
  );
};

export const editContactOnHubSpot = async (data) => {
  const {
    firstName,
    lastName,
    company,
    email,
    website,
    phone,
    billingAddress,
  } = data;

  const publicObjectSearchRequest = {
    filterGroups: [
      {
        filters: [
          {
            propertyName: "email",
            operator: "EQ",
            value: email,
          },
        ],
      },
    ],
    limit: 100,
    after: 0,
  };

  const response = await hubspotClient.crm.contacts.searchApi.doSearch(
    publicObjectSearchRequest
  );

  const contactID = response.results[0].id;
  const res = await hubspotClient.crm.contacts.basicApi.update(contactID, {
    properties: {
      firstname: firstName,
      lastname: lastName,
      work_email: email,
      company: company,
      website: website,
      phone: phone,
      billing_address: billingAddress,
    },
  });
  console.log(res);
};
