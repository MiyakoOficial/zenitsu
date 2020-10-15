const Discord = require('discord.js');
module.exports = {
    config: {
        name: "editprofile",//Nombre del cmd
        alias: [], //Alias
        description: "Editas tu perfil", //Descripción (OPCIONAL)
        usage: "z!editprofile",
        category: 'diversion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!args[1]) return embedResponse('Ejemplo de uso correcto: z!editprofile nick Hello world!');

        let data;

        let valor = args.slice(1).join(' ');

        switch (args[0]) {
            case 'description':

                if (valor.length >= 1024) return embedResponse('Limite de caracteres sobrepasados.')

                data = await client.updateData({ id: message.author.id }, { description: valor }, 'profile')

                return embedResponse('Ahora tu descripción es ' + data.description);

                break;

            case 'img':

                data = await client.updateData({ id: message.author.id }, { img: args[1] }, 'profile')

                return embedResponse(`Imagen cambiada, ahora prueba con el comando profile.`);

                break;

            case 'thumbnail':

                data = await client.updateData({ id: message.author.id }, { thumbnail: args[1] }, 'profile')

                return embedResponse(`Thumbnail cambiado, ahora prueba con el comando profile.`);

                break;

            case 'footerimg':

                data = await client.updateData({ id: message.author.id }, { footer: args[1] }, 'profile')

                return embedResponse(`Imagen del footer cambiado, ahora prueba con el comando profile.`);

                break;

            case 'footertext':

                if (valor.length >= 1024) return embedResponse('Limite de caracteres sobrepasados.')

                data = await client.updateData({ id: message.author.id }, { footertext: valor }, 'profile')

                return embedResponse('Ahora tu footer es ' + data.footertext);

                break;

            case 'nick':

                if (valor.length >= 1024) return embedResponse('Limite de caracteres sobrepasados.')

                data = await client.updateData({ id: message.author.id }, { nick: valor }, 'profile')

                return embedResponse('Ahora tu apodo es ' + data.nick);

                break;

            default:

                embedResponse(`Elije entre las opciones disponibles: img, thumbnail, footerimg, footertext, nick, description`)

                break;
        }
    }
}