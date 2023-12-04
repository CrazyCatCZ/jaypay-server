import { WebClient } from "@slack/web-api";

const web = new WebClient(process.env.SLACK_API_KEY);

export const createChannel = async (userId, userName) => {
  console.log(userId, userName);
};
