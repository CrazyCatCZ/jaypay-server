import { WebClient } from "@slack/web-api";

const web = new WebClient(process.env.SLACK_API_KEY);

export const createPrivateChannel = async (user) => {
  // Create a private channel with the user's username
  const channelName = user.real_name; // Assuming username is unique
  const createChannelResponse = await web.conversations.create({
    name: channelName,
    is_private: true,
  });
};
