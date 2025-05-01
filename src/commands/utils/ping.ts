import { SlashCommandBuilder } from "discord.js";
import { client } from "../..";
import prisma from "../../utils/prisma";

export default new client.command({
  structure: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute: async (client, interaction) => {
    await interaction.reply("Pong!");
  },
});
