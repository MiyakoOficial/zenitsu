/* eslint-disable no-case-declarations */
const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "editprofile"
        this.category = 'diversion'
    }

    /**
     * 
     * @param {Object} obj
     * @param {import('discord.js').Message} obj.message
     * @param {import('discord.js').Client} obj.client
     * @param {Array<String>} obj.args
     * @returns {Promise<(import('discord.js').Message|void)>}
     */

    async run(obj) {

        const { client, message, args, embedResponse } = obj

        let data;

        let valor = args.slice(1).join(' ');

        switch (args[0]) {
            case 'description':

                if (!valor) return embedResponse('<:cancel:804368628861763664> | Necesitas especificar tu descripción.')

                if (valor.length >= 1024) return embedResponse('<:cancel:804368628861763664> | Limite de caracteres sobrepasados. (1024)')

                data = await client.updateData({ id: message.author.id }, { description: valor }, 'profile')

                return embedResponse(`Descripción cambiada correctamente.`);

            case 'img':
                const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi,
                    url = (message.attachments.array()[0] ? message.attachments.array()[0].attachment : null) || (args[1].match(regex) ? args[1].match(regex)[0] : null)

                if (!url)
                    return embedResponse('<:cancel:804368628861763664> | Adjunta un archivo o introduce una URL valida.');

                data = await client.updateData({ id: message.author.id }, { img: args[1] }, 'profile')

                return embedResponse(`Imagen cambiada, ahora prueba con el comando profile.`);



            case 'thumbnail':

                if (!args[1].match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi))
                    return embedResponse('Introduce una URL valida!');

                data = await client.updateData({ id: message.author.id }, { thumbnail: args[1] }, 'profile')

                return embedResponse(`Thumbnail cambiado, ahora prueba con el comando profile.`);



            case 'footerimg':

                if (!args[1].match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi))
                    return embedResponse('Introduce una URL valida!');

                data = await client.updateData({ id: message.author.id }, { footer: args[1] }, 'profile')

                return embedResponse(`Imagen del footer cambiado, ahora prueba con el comando profile.`);



            case 'footertext':

                if (valor.length >= 1024) return embedResponse('Limite de caracteres sobrepasados.')

                data = await client.updateData({ id: message.author.id }, { footertext: valor }, 'profile')

                return embedResponse('Ahora tu footer es ' + data.footertext);



            case 'nick':

                if (valor.length >= 1024) return embedResponse('Limite de caracteres sobrepasados.')

                data = await client.updateData({ id: message.author.id }, { nick: valor }, 'profile')

                return embedResponse('Ahora tu apodo es ' + data.nick);



            case 'color':

                // eslint-disable-next-line no-case-declarations
                const check = /^#[a-fA-F0-9]{3,6}$/.test(valor)

                if (!check) return embedResponse('Usa el tipo "hexcolor", ejemplo: z!editprofile color #FF0000')

                data = await client.updateData({ id: message.author.id }, { color: `${valor}` }, 'profile')

                return embedResponse('Ahora tu color de embed es ' + data.color);



            default:

                embedResponse(`Elije entre las opciones disponibles: img, thumbnail, footerimg, footertext, nick, description, color`)

                break;
        }
    }
}