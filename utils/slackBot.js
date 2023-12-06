import { WebClient } from "@slack/web-api";

const web = new WebClient(process.env.SLACK_API_KEY);

const validChannelName = (name) => {
  // Replace invalid characters with underscores
  const sanitized = name.replace(/[^a-z0-9-_]/g, "_");

  // Ensure the length is 21 characters or less
  return sanitized.substring(0, 21);
};

export const createInviteMessage = async (event) => {
  const { user } = event;
  const channelName = user.name;

  const channel = await web.conversations.create({
    name: channelName,
    is_private: true,
  });

  await web.conversations.invite({
    channel: channel.id,
    users: user.id,
  });

  await web.chat.postMessage({
    channel: channel.id,
    text: `Welcome to the private channel, ${channelName}!`,
  });
};
