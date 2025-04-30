import { Client, Events, GatewayIntentBits, Message } from "discord.js";
import dotenv from "dotenv";
import { ExtendedClient } from "./structures/ExtendedClient";
dotenv.config();

export const client = new ExtendedClient();

client.start();
client.loadModules();
client.deploy();
