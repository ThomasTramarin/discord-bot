import { Events, Interaction } from "discord.js";
import { client } from "../..";

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  // If the interaction is not a slash command, return
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
});
