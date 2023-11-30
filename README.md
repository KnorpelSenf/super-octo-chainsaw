# super octo chainsaw

## Setup

Open <https://my.telegram.org/apps> to create an app.

```sh
export API_ID=<api_id>
export API_HASH=<api_hash>
```

## Run With Bot

Open <https://t.me/botfather> to create a bot.

```sh
BOT_TOKEN=<token> deno run --allow-env --allow-net main.ts
```

## Run With User

```sh
USER=true deno run --allow-env --allow-net main.ts
```

> Note: repeats the login procedure once and then crashes, so this will not work yet.
