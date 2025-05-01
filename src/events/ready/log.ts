import { ExtendedClient } from "../../structures/ExtendedClient";
import logger from "../../utils/logger";

export default async (client: ExtendedClient) => {
  logger.info(`Logged in as ${client.user?.tag}`);
};
