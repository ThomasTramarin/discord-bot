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
```

### 3. **Running the bot:**

#### Development Mode:

To run the bot in development mode, using Docker and live code reloading:

```bash
docker compose up --build
```

- The bot will be running with `hot reloading`.

#### Production Mode:

To run the bot in production mode:

1. **Build the container with the production Dockerfile:**

```bash
docker build -t discord-bot -f Dockerfile .
```

2. **Run the container:**

```bash
docker run -d --name discord-bot -e TOKEN="your-token" discord-bot
```

- This will run the bot in production mode, optimized for performance. It does not reload on code changes.
