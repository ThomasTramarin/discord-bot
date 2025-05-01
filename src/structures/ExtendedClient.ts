import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import { Command } from "../types/Command";
import { readdirSync } from "fs";
import path from "path";
import logger from "../utils/logger";

export class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public commandsArray: Command["structure"][] = [];

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  public command = class {
    public structure: Command["structure"];
    public execute: Command["execute"];

    constructor(data: Command) {
      this.structure = data.structure;
      this.execute = data.execute;
    }
  };

  // Method to start the server (login with the discord bot TOKEN)
  public async start() {
    await this.login(process.env.TOKEN);
  }

  // Method to deploy commands globally
  public async deploy() {
    const rest = new REST().setToken(process.env.TOKEN ?? "");

    try {
      logger.info("Started refreshing application (/) commands.");
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID ?? ""), {
        body: this.commandsArray,
      });
      logger.info("Successfully reloaded application (/) commands.");
    } catch (err) {
      logger.error(`Could not deploy commands: ${err}`);
    }
  }

  public loadModules() {
    const basePathCommands = path.join(__dirname, "..", "commands");
    const basePathEvents = path.join(__dirname, "..", "events");

    // Load commands
    for (const dir of readdirSync(basePathCommands)) {
      for (const file of readdirSync(path.join(basePathCommands, dir))) {
        const module: Command = require(path.join(
          basePathCommands,
          dir,
          file
        )).default;

        this.commands.set(module.structure.name, module);
        this.commandsArray.push(module.structure);

        logger.info(`Loaded command: ${dir}/${file}`);
      }
    }

    // Load events based on folder name
    const eventDirs = readdirSync(basePathEvents).filter(
      (dir) => path.extname(dir) === ""
    );

    for (const dir of eventDirs) {
      const eventName = dir;
      const eventFolderPath = path.join(basePathEvents, dir);

      const eventFies = readdirSync(eventFolderPath)
        .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
        .sort();

      this.on(eventName, async (...args) => {
        for (const file of eventFies) {
          const event = require(path.join(eventFolderPath, file)).default;
          await event(this, ...args);
        }
      });

      logger.info("Loaded event: " + eventName);
    }
  }
}
