module.exports = {
    config: {
        name: "unfollowprofile", //nombre del cmd
        alias: [], //Alias
        description: "Dejas de seguir el perfil de una persona.", //Descripción (OPCIONAL)
        usage: "z!followprofile @mencion",
        category: 'diversion'

    }, run: async ({ client, message, embedResponse }) => {

        let user = message.mentions.users.first();

        if (!user || !user?.id || user?.id == message.author.id)
            return embedResponse('¿A quien quieres dejar de seguir?');

        let check = (await client.getData({ id: user.id }, 'profile')).seguidores.includes(message.author.id);

        if (!check)
            return embedResponse('No seguias a ' + user.tag)

        await client.updateData({ id: user.id }, { $pull: { seguidores: message.author.id } }, 'profile');

        return embedResponse('Ahora no sigues a ' + user.tag)

    }
}