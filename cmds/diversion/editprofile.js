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

        let valor = args.slice(1).join(' ');

        switch (args[0]) {
            case 'description':

                if (valor.length >= 1024) return embedResponse('Limite de caracteres sobrepasados.')

                let data = await client.updateData({ id: message.author.id }, { description: valor }, 'profile')

                return embedResponse('Ahora tu descripción es ' + data.description);

                break;

            case 'img':

                let data = await client.updateData({ id: message.author.id }, { img: args[1] }, 'profile')

                return embedResponse(`Imagen cambiada, ahora prueba con el comando profile.`);

                break;

            case 'thumbnail':

                let data = await client.updateData({ id: message.author.id }, { thumbnail: args[1] }, 'profile')

                return embedResponse(`Thumbnail cambiado, ahora prueba con el comando profile.`);

                break;

            case 'footerimg':

                let data = await client.updateData({ id: message.author.id }, { footer: args[1] }, 'profile')

                return embedResponse(`Imagen del footer cambiado, ahora prueba con el comando profile.`);

                break;

            case 'footertext':

                if (valor.length >= 1024) return embedResponse('Limite de caracteres sobrepasados.')

                break;

            case 'nick':

                if (valor.length >= 1024) return embedResponse('Limite de caracteres sobrepasados.')

                break;

            default:

                embedResponse(`Elije entre las opciones disponibles: img, thumbnail, footerimg, footertext, nick, description`)

                break;
        }
    }
}