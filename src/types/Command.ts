import {
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { ExtendedClient } from "../structures/ExtendedClient";

export interface Command {
  structure: SlashCommandBuilder | ContextMenuCommandBuilder | any;
  execute: (
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction
  ) => void;
}
