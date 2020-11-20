module.exports = {
    config: {
        name: "likeprofile", //nombre del cmd
        alias: [], //Alias
        description: "Darle like al perfil de una persona", //Descripción (OPCIONAL)
        usage: "z!likeprofile",
        category: 'diversion'

    }, run: async ({ client, message, embedResponse }) => {

        let user = message.mentions.users.first();

        if (!user || !user?.id)
            return embedResponse('¿A quien quieres darle un like?');

        let check = (await client.getData({ id: user.id }, 'profile')).likes.includes(message.author.id);

        if (check)
            return embedResponse('Ya le habias dado like a ' + user.tag)

        await client.updateData({ id: user.id }, { $push: { likes: message.author.id } }, 'profile');

        return embedResponse('Gracias, le has dado un like a ' + user.tag)

    }
}