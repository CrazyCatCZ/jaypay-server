import dotenv from "dotenv";
import slugify from "slugify";
import { WebClient } from "@slack/web-api";

dotenv.config();

const OWNER_ID = "U067NC15FR9";
const WELCOME_CHANNEL_ID = "C067KH1AG8M";
const WELCOME_MESSAGE = `:wave: Welcome to your private Slack channel!\n\nTake a quick peek at the <#${WELCOME_CHANNEL_ID}> channel for important info.\n\nReady to discuss more your project? Pick a time that suits you on our <https://jaypay.setmore.com/jakubplechac|Meeting Scheduler> or you can write your desired time in chat.\n\nFeel free to ask any questions and share your thoughts.`;

export const inviteToSlack = async (data) => {
  const { email, company } = data;

  const web = new WebClient(process.env.SLACK_USER_TOKEN);
  const web2 = new WebClient(process.env.SLACK_BOT_TOKEN);

  const channelName = `${company} - web`;

  const createChannelResponse = await web.conversations.create({
    name: slugify(channelName).toLowerCase(),
    is_private: true,
  });

  const channelID = createChannelResponse.channel.id;
  console.log(channelID);

  // Send invitation through email
  await web2.users.admin.invite({
    channel: channelID,
    emails: email,
  });

  // Send a welcome message
  await web.chat.postMessage({
    channel: channelID,
    text: WELCOME_MESSAGE,
  });
};
