const { ShardingManager } = require('discord.js');
require('dotenv').config();
const shards = new ShardingManager('../src/server.js', {
    token: process.env.BOT_TOKEN,
    totalShards: 1
});
shards.on('launch', shard => {
    console.log(`Shard [${shard.id}] lanzado`);
    shard.on("death", () => console.log(`Shard [${shard.id}] murió`))
        .on("ready", () => console.log(`Shard [${shard.id}] listo`))
        .on("disconnect", () => console.log(`Shard [${shard.id}] desconectado`))
        .on("reconnecting", () => console.log(`Shard [${shard.id}] reconectando...`));
});

shards.on('message', (shard, message) => {
    console.log(`#${shard.id} | ${message._eval} | ${message._result}`);
});

shards.spawn().catch((err) => {
    console.log(err);
});