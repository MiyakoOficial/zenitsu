module.exports = {
    config: {
        name: "followprofile", //nombre del cmd
        alias: [], //Alias
        description: "Sigues el perfil de una persona.", //Descripción (OPCIONAL)
        usage: "z!followprofile @mencion",
        category: 'diversion'

    }, run: async ({ client, message, embedResponse }) => {

        let user = message.mentions.users.first();

        if (!user || !user?.id || user?.id == message.author.id)
            return embedResponse('¿A quien quieres seguir?');

        let check = (await client.getData({ id: user.id }, 'profile')).seguidores.includes(message.author.id);

        if (check)
            return embedResponse('Ya sigues a ' + user.tag)

        await client.updateData({ id: user.id }, { $push: { seguidores: message.author.id } }, 'profile');

        return embedResponse('Ahora sigues a ' + user.tag)

    }
}