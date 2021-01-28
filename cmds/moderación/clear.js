const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
    constructor() {
        super()
        this.name = "clear";
        this.alias = ['purge'];
        this.category = 'moderacion';
        this.botPermissions = { guild: [], channel: ['MANAGE_MESSAGES'] }
        this.memberPermissions = { guild: [], channel: ['MANAGE_MESSAGES'] }
    }
    async run({ message, args, embedResponse }) {

        if (isNaN(args[0]) || !args[0]) return embedResponse('<:cancel:804368628861763664> | Escribe la cantidad de mensajes que quieres borrar.')
        if (args[0] > 100 || args[0] <= 0) return embedResponse('<:cancel:804368628861763664> | Escribe un numero entre el 1 al 100')
        await message.delete()
        await message.channel.bulkDelete(args[0], true).then(d => {
            if (d.size < args[0]) return d.size === 0 ? embedResponse('<:cancel:804368628861763664> | Ningun mensaje fue eliminado.') : embedResponse('<:accept:804368642913206313> | Mensajes eliminados: ' + d.size)

            else return embedResponse('<:accept:804368642913206313> | Mensajes eliminados: ' + d.size)

        })
    }
}
