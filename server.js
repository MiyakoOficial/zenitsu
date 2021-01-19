require('dotenv').config();
const { ShardingManager } = require('discord.js')

const sharder = new ShardingManager('./index.js', {
    token: 'es obvio ._.xd',
    shards: 'auto'
});

sharder.spawn();
/*
shardError shardResume shardReady shardReconnecting shardDisconnect
*/

sharder.on('shardDisconnect', shard => console.log(`La shard ${shard.id} se desconecto.`))
    .on('shardResume', shard => console.log(`Shard ${shard.id} resumida.`))
    .on('shardReady', shard => console.log(`La shard ${shard.id} esta lista.`))
    .on('shardCreate', shard => console.log(`La shard ${shard.id} fue creada.`));