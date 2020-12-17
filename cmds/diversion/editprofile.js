module.exports = {
    config: {
        name: "editprofile", //nombre del cmd
        alias: [], //Alias
        description: "Editas tu perfil", //Descripción (OPCIONAL)
        usage: "z!editprofile",
        category: 'diversion',
        botPermissions: [],
        memberPermissions: []


    }, run: async ({ client, message, args, embedResponse }) => {

        if (!args[1]) return embedResponse('Ejemplo de uso correcto: z!editprofile nick Hello world!');

        let data;

        let valor = args.slice(1).join(' ');

        switch (args[0]) {
            case 'description':

                if (valor.length >= 1024) return embedResponse('Limite de caracteres sobrepasados.')

                data = await client.updateData({ id: message.author.id }, { description: valor }, 'profile')

                return embedResponse('Ahora tu descripción es ' + data.description);



            case 'img':

                if (!args[1].match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi))
                    return embedResponse('Introduce una URL valida!');

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

                data = await client.updateData({ id: message.author.id }, { color: `#${valor}` }, 'profile')

                return embedResponse('Ahora tu color de embed es ' + data.color);



            default:

                embedResponse(`Elije entre las opciones disponibles: img, thumbnail, footerimg, footertext, nick, description, color`)

                break;
        }
    }
}