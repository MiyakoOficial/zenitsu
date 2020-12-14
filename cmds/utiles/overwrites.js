const Discord = require("discord.js")

module.exports = {
    config: {
        name: "overwrites", //nombre del cmd
        alias: [], //Alias
        description: "Ver los permisos del canal", //Descripción (OPCIONAL)
        usage: "z!overwrites <#canal>",
        category: 'utiles',
        botPermissions: [],
        memberPermissions: []
    },
    run: async ({ message, args, client }) => {

        let canal = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first() || message.channel

        let permisos = canal.permissionOverwrites;
        let roles = permisos.filter(a => a.type == 'role');
        let miembros = permisos.filter(a => a.type == 'member');
        let str = '';
        for (let a of miembros.filter(a => a.deny.toArray().length || a.allow.toArray().length).array()) {
            str += `[🙎] ${(await client.users.fetch(a.id).catch(() => { }))?.tag}\n\t\t${a.deny.toArray().length ? '❌' + a.deny.toArray().join(' ❌') : ''} ${a.allow.toArray().length ? '✅' + a.allow.toArray().join(' ✅') : ''}\n`
        }

        for (let a of roles.filter(a => a.deny.toArray().length || a.allow.toArray().length).array()) {
            str += `[👪] ${message.guild.roles.cache.get(a.id)?.name}\n\t\t${a.deny.toArray().length ? '❌' + a.deny.toArray().join(' ❌') : ''} ${a.allow.toArray().length ? '✅' + a.allow.toArray().join(' ✅') : ''}\n`
        }

        str += `Este canal ${canal.permissionsLocked ? 'esta sincronizado con la categoria' : 'no esta sincronizado con la categoria'}.`

        message.channel.send(str, { code: '' });

    }
}