require('dotenv').config();
const { ShardingManager } = require('discord.js');

const sharder = new ShardingManager('./index.js', {
    token: process.env.BOT_TOKEN,
    shards: "auto"
});

sharder.spawn();
/*
shardError shardResume shardReady shardReconnecting shardDisconnect
*/

sharder
    .on("shardCreate", shardd => {
        console.log(`La shard ${shardd.id} fue creada.`)
        shardd.on('shardDisconnect', shard => console.log(`La shard ${shard.id} se desconecto.`))
            .on('shardResume', shard => console.log(`Shard ${shard.id} resumida.`))
            .on('shardReady', shard => console.log(`La shard ${shard.id} esta lista.`))
    })