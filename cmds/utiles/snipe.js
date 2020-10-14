//Después de Alias es opcional.
const ayuda = 'elsuperduperincreibleseparadordearraysencaminoxdxd:v:vxdxdestonadieloescribiranuncaxdxdhdsbasudkjbsdjnasiudhaskkdhbdjfasdfilshdvfaciludvshfilahsdvfcliuasdbvfcilukjbsdvfiulKJVIUHJIOSDHADUJohifjbdsofihbsfihjbsdfiohbaiaslhabodhb'
const Discord = require('discord.js');

module.exports = {
    config: {
        name: "snipe",//Nombre del cmd
        alias: [], //Alias
        description: "Ver el ultimo mensaje borrado", //Descripción (OPCIONAL)
        usage: "z!snipe #mention",
        category: 'utiles'
    },
    run: async ({ client, message, args, embedResponse }) => {

        let canal = message.mentions.channels.first() || message.channel;

        let data = (await client.getData({ id: canal.id }, 'snipe'))


        if (!data || !data.snipe || data.snipe === 'default') return embedResponse("Nada en la base de datos")
        else {
            let la_data = data.snipe
            let separador = la_data.split(ayuda)
            if (!separador || !separador[1]) return embedResponse("Nada en la base de datos")
            let embed = new Discord.MessageEmbed()
                .addField('Message', separador[0].slice(0, 1024).includes('discord.gg/') ? `The message has an invite!` : separador[0].slice(0, 1024))
                .addField('Author', separador[1])
                .setColor(client.color)
                .setTimestamp()
                .setTitle('Snipe')
                .setThumbnail('https://media1.tenor.com/images/8c3e8a0a3c7b0afc22624c9278be6a89/tenor.gif?itemid=5489827')
            return message.channel.send({ embed: embed })
        }
    }
}