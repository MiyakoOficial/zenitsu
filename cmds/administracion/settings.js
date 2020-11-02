const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "settings",//Nombre del cmd
        alias: [], //Alias
        description: "Configurar opciones", //Descripción (OPCIONAL)
        usage: "...",
        category: 'administracion'
    },
    run: async ({ client, message, args, embedResponse }) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return embedResponse("No tienes el permiso `ADMINISTRATOR`")

        //await client.updateData({ id: message.guild.id }, { channellogs: channel.id }, 'settings')

        switch (args[0]) {

            case 'maxwarns':

                if (!Number(args[1]) || parseInt(args[1]) <= 1)
                    return embedResponse('No puedes establecer un numero menor a igual que 1.');

                let data = await client.updateData({ id: message.guild.id }, { warnsParaKickear: Number(args[1]) }, 'settings');

                return embedResponse('Ahora para ser expulsado se necesitan ' + data.warnsParaKickear + ' advertencias.')
                break;

            case 'showlevel':

                let idk = async (bol) => { return await client.updateData({ id: message.guild.id }, { mostrarAnuncio: bol }, 'settings'); };

                if (args[1] == 'on') {
                    await idk(true);
                    return embedResponse('Ahora se podra ver el anuncio del nivel.')
                }

                else if (args[1] == 'off') {
                    await idk(false);
                    return embedResponse('Ahora no se podra ver el anuncio del nivel.')
                }

                else {
                    embedResponse('Elije entre on y off.\nEjemplo: z!settings showlevel off');
                }

                break;

            case 'levelsystem':


                idk = async (bol) => { return await client.updateData({ id: message.guild.id }, { sistemaDeNiveles: bol }, 'settings'); };

                if (args[1] == 'on') {
                    await idk(true);
                    return embedResponse('Ahora el sistema de niveles funciona.')
                }

                else if (args[1] == 'off') {
                    await idk(false);
                    return embedResponse('Ahora el sistema de niveles no funciona.')
                }

                else {
                    embedResponse('Elije entre on y off.\nEjemplo: z!settings levelsystem off');
                }

                break;


            default:
                return embedResponse('Elije entre: levelsystem, showlevel o maxwarns.')
                break;

        }
    }
}
