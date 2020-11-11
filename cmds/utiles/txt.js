module.exports = {
    config: {
        name: "txt",
        alias: [],
        description: "Conviertes el texto a un archivo .txt",
        usage: "z!txt Hola mundo!",
        category: 'utiles'
    },
    run: ({ message, args, embedResponse }) => {
        if (!message.channel.permissionsFor(message.author).has('ATTACH_FILES')) return embedResponse('No tienes el permiso `ATTACH_FILES`')
        if (!message.channel.permissionsFor(message.client.user).has('ATTACH_FILES')) return embedResponse('No tengo el permiso `ATTACH_FILES`')
        if (!args[0]) return embedResponse('Escribe algo!');
        return message.channel.send({
            files: [{
                attachment: Buffer.from(args.join(' ')),
                name: "Text.txt"
            }]
        })
    }
}