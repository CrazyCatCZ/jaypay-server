import { WebClient } from "@slack/web-api";

const web = new WebClient(process.env.SLACK_API_KEY);

const validChannelName = (name) => {
  // Replace invalid characters with underscores
  const sanitized = name.replace(/[^a-z0-9-_]/g, "_");

  // Ensure the length is 21 characters or less
  return sanitized.substring(0, 21);
};

export const createPrivateChannel = async (user) => {
  // Create a private channel with the user's username
  const channelName = validChannelName(user.name);
  const createChannelResponse = await web.admin.conversations.create({
    name: channelName,
    is_private: true,
  });
};
