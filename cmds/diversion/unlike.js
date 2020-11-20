module.exports = {
    config: {
        name: "unlikeprofile", //nombre del cmd
        alias: [], //Alias
        description: "Quitarle like al perfil de una persona", //Descripción (OPCIONAL)
        usage: "z!likeprofile @mencion",
        category: 'diversion'

    }, run: async ({ client, message, embedResponse }) => {

        let user = message.mentions.users.first();

        if (!user || !user?.id || user?.id == message.author.id)
            return embedResponse('¿A quien quieres quitarle un like?');

        let check = (await client.getData({ id: user.id }, 'profile')).likes.includes(message.author.id);

        if (!check)
            return embedResponse('No le habias dado like a ' + user.tag)

        await client.updateData({ id: user.id }, { $pull: { likes: message.author.id } }, 'profile');

        return embedResponse('Le has quitado un like a ' + user.tag)

    }
}