module.exports = {
    config: {
        name: "txt",
        alias: [],
        description: "Conviertes el texto a un archivo .txt",
        usage: "z!txt Hola mundo!",
        category: 'utiles',
        botPermissions: ['ATTACH_FILES'],
        memberPermissions: ['ATTACH_FILES']
    },
    run: ({ message, args, embedResponse }) => {
        if (!args[0]) return embedResponse('<:cancel:779536630041280522> | Escribe algo para convertirlo a un archivo de texto.');
        return message.channel.send({
            files: [{
                attachment: Buffer.from(args.join(' ')),
                name: "Text.txt"
            }]
        })
    }
}