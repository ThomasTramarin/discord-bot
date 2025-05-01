import { Events, Interaction } from "discord.js";
import { ExtendedClient } from "../../structures/ExtendedClient";

export default async (client: ExtendedClient, interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    command.execute(client, interaction);
  } catch (err) {
    console.error(err);
  }
};
