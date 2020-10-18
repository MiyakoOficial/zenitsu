const Discord = require('discord.js');
module.exports = {
    config: {
        name: "buylevel",//Nombre del cmd
        alias: ['buyl'], //Alias
        description: "Comprar niveles", //Descripción (OPCIONAL)
        usage: "z!buylevel num",
        category: 'rol'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let { dinero } = await client.getData({ id: message.author.id }, 'demonios');

        let cuanto = args[0];

        if (!cuanto || isNaN(cuanto))
            return embedResponse('Tienes que poner un numero, ejemplo: z!buylevel 5')

        cuanto = Math.floor(cuanto);

        if (cuanto <= 0)
            return embedResponse('Escoge un numero mayor que 0!')

        if (cuanto * 125 > dinero)
            return embedResponse('No puedes comprar la cantidad que quieres!\n\nPrecio de nivel: 125')

        let data = await client.updateData({ id: message.author.id }, { $inc: { nivelespada: cuanto, nivelusuario: cuanto } }, 'demonios');
        await client.updateData({ id: message.author.id }, { $inc: { dinero: -(cuanto * 125) } }, 'demonios');

        return embedResponse('Ahora eres nivel ' + data.nivelusuario);

    }
}