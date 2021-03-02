// eslint-disable-next-line no-unused-vars
const { MessageEmbed, Message, Client } = require("discord.js");


const Command = require('../../Utils/Classes').Command;
module.exports = module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "setlogs" //nombre del cmd
        this.alias = [] //Alias
        this.category = 'administracion'
        this.memberPermissions = { guild: ['MANAGE_GUILD'], channel: [] }
    }

    /**
     * 
     * @param {Object} obj
     * @param {Message} obj.message
     * @param {Client} obj.client
     */

    async run(obj) {

        const { client, message } = obj;

        let channel = message.mentions.channels.first();
        let embedErr = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`<:cancel:804368628861763664> | No has mencionado un canal valido.`)
            .setTimestamp()

        if (!channel || !channel.guild || !(channel.guild.id == message.guild.id)) return message.channel.send({ embed: embedErr })

        let embedE = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`<:cancel:804368628861763664> | No tengo permisos para gestionar el canal mencionado.`)
            .setTimestamp()

        if (!channel.permissionsFor(client.user).has("MANAGE_CHANNELS"))
            return message.channel.send({ embed: embedE })

        let wbk = await channel.createWebhook(`${client.user.tag} logs`);

        let data = await client.updateData({ id: message.guild.id }, { idWeb: wbk.id, tokenWeb: wbk.token }, 'logs');

        let embed = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`<:moderator:804368587115593800> | ${message.author.username} ha establecido el canal de logs en: <#${data.channellogs}>`)
            .setTimestamp()
        message.guild.cacheLogs = data;
        return message.channel.send({ embed: embed })
    }
}