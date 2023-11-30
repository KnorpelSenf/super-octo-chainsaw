import {
  Client,
  functions,
  getRandomId,
  StorageMemory,
} from "https://deno.land/x/mtkruto@0.1.118/mod.ts";

function env(name: string) {
  return Deno.env.get(name) ?? (() => {
    throw new Error(`Missing env var ${name}!`);
  })();
}
const apiId = parseInt(env("API_ID"), 10);
const apiHash = env("API_HASH");

const client = new Client(new StorageMemory(), apiId, apiHash);

async function measure(task: () => Promise<unknown>): Promise<number> {
  const before = Date.now();
  await task();
  const after = Date.now();
  const delay = after - before;
  return delay;
}

client.use(async (ctx, next) => {
  const delay = await measure(next);
  if (ctx.chat) {
    await ctx.reply(`Handling your message took ${delay} ms.`);
  }
});

client.command("ping", async (ctx) => {
  async function task() {
    const request = new functions.Ping({ pingId: getRandomId() });
    await client.invoke(request);
  }
  const delay = await measure(task);
  await ctx.reply(`The ping itself took ${delay} ms.`);
});

client.on("message", async (ctx) => {
  await ctx.reply("Send /ping");
});

await client.start(env('BOT_TOKEN'));
