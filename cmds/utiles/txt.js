const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "txt"
        this.category = 'utiles'
        this.botPermissions.channel = ['ATTACH_FILES']
        this.memberPermissions.channel = ['ATTACH_FILES']
    }
    run({ message, args, embedResponse }) {
        if (!args[0]) return embedResponse('<:cancel:804368628861763664> | Escribe algo para convertirlo a un archivo de texto.');
        return message.channel.send({
            files: [{
                attachment: Buffer.from(args.join(' ') + '\n\n\n' + new Date().toDateString()),
                name: "Text.txt"
            }]
        })
    }
}