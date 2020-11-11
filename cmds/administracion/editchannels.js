const Discord = require("discord.js");
const cooldown = new Set();
const prefix = 'z!';
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "editchannels", //nombre del cmd
        alias: [], //Alias
        description: "Editar todos los canales(maximo 100)", //Descripción (OPCIONAL)
        usage: "z!editchannels @mencion",
        category: 'administracion'
    },
    run: async ({ message, args, embedResponse }) => {

        const pretty = require('pretty-ms');
        if (!message.member.hasPermission('ADMINISTRATOR')) return embedResponse('No tienes el permiso `ADMINISTRATOR`.')
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return embedResponse('No tienes el permiso `MANAGE_CHANNELS`.')
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return embedResponse('No tengo el permiso `ADMINISTRATOR`.')
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return embedResponse('No tengo el permiso `MANAGE_CHANNELS`.')
        if (cooldown.has(message.guild.id)) {
            embedResponse(message.author.username + ", comando en cooldown, por favor espere!")
            return;
        }
        let id = message.mentions.roles.first() || message.mentions.users.first()
        if (!id) return embedResponse('Menciona un rol o usuario!\nEjemplo:\n' + prefix + 'editchannels <mencion de rol o user> <allowall | denyall | default>')
        id = id.id
        let canales = message.guild.channels.cache.filter(a => a.type === 'text' && a.manageable && a.viewable && a.deletable);
        if (!canales.array()[0]) return embedResponse('No puedo editar ningun canal de texto!')
        if (canales.size >= 101) return embedResponse('Este servidor tiene más de 100 canales de texto!')
        if (!args[1]) return embedResponse('Ejemplo:\n' + prefix + 'editchannels <mencion de rol o user> <allowall | denyall | default>')
        if (!message.guild.roles.cache.get(id) && !message.guild.members.cache.get(id)) return embedResponse('Error en encontrar la ID de usuario/rol')
        if (!['default', 'denyall', 'allowall'].includes(args[1])) return embedResponse('Escoge entre allowall, denyall o default')
        let bolChose;

        switch (args[1]) {

            case 'allowall':
                bolChose = true
                break;

            case 'denyall':
                bolChose = false
                break;

            case 'default':
                bolChose = null
                break;

            default:
                bolChose = 'none';
                break

        }

        if (bolChose === 'none') return embedResponse('Escoge entre true, false, null')

        message.channel.send(`Editando canales...\nEsto puede llevar un estimado de: ${pretty(2000 * canales.size, { verbose: true })}`)
        cooldown.add(message.guild.id);
        setTimeout(() => {
            cooldown.delete(message.guild.id);
        }, 2000 * canales.array().length); //5 minutos
        for await (let ch of canales.array()) {
            await Discord.Util.delayFor(2000)

            await ch.updateOverwrite(id, {
                SEND_MESSAGES: bolChose
            }).catch(() => { })
        }

    }
}