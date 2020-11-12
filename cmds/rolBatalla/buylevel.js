module.exports = {
    config: {
        name: "buylevel", //nombre del cmd
        alias: ['buyl'], //Alias
        description: "Comprar niveles", //Descripción (OPCIONAL)
        usage: "z!buylevel num",
        category: 'rol'

    }, run: async ({ client, message, args, embedResponse }) => {

        let costo = 250;

        let { dinero, nivelespada } = await client.getData({ id: message.author.id }, 'demonios');

        let cuanto = args[0];

        if (!cuanto || isNaN(cuanto))
            return embedResponse('Tienes que poner un numero, ejemplo: z!buylevel 5')

        cuanto = Math.floor(cuanto);

        costo = (nivelespada + costo)

        if (cuanto <= 0)
            return embedResponse('Escoge un numero mayor que 0!')

        if (cuanto * costo > dinero)
            return embedResponse('No puedes comprar la cantidad que quieres!\n\nPrecio de nivel: ' + costo)

        let data = await client.updateData({ id: message.author.id }, { $inc: { nivelespada: cuanto } }, 'demonios');
        await client.updateData({ id: message.author.id }, { $inc: { dinero: -(cuanto * costo) } }, 'demonios');

        return embedResponse('Ahora eres nivel ' + data.nivelespada);

    }
}