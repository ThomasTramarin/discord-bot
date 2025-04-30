import { Client, Events, GatewayIntentBits, Message } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`Bot logged in as ${client.user?.tag}`);
});

client.on(Events.MessageCreate, (message: Message) => {
  console.log(`New message: ${message.content}`);
});

client.login(process.env.TOKEN);
