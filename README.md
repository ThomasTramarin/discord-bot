# Discord Bot

## 🚀 Installation

### 1. **Clone the repository:**

```bash
git clone https://github.com/ThomasTramarin/discord-bot.git
cd discord-bot
```

### 2. **Setup:**

Create a `.env` file in the root of the project

```env
TOKEN=your_bot_token
CLIENT_ID=your_client_id
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=db_bot
DATABASE_URL="postgresql://postgres:postgres@db:5432/db_bot?schema=public"
```

### 3. **Running the bot:**

#### Development Mode:

To run the bot in development mode, using Docker and live code reloading:

```bash
docker compose up --build
```

- The bot will be running with `hot reloading`.

#### Production Mode:

To run the bot in production mode (simulate a production environment):

```bash
docker compose -f compose.prod.yaml up --build
```

- This will run the bot in production mode, optimized for performance. It does not reload on code changes.
