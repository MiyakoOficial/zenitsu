const Discord = require("discord.js")

module.exports = {
    config: {
        name: "userchats",
        alias: [],
        description: "Ver tus chats creados",
        usage: "z!userchats",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        let seleccion = parseInt(args[0]) || 1;

        if (seleccion < 1) {
            seleccion = 1
        }

        let paginas = funcionPagina((await getListUserOwner(message)), 5);

        if (!paginas || !paginas[0])
            return embedResponse('Ningun chat creado.')

        if (!paginas[seleccion - 1])
            return embedResponse("Pagina inexistente!")


        return embedResponse(paginas[seleccion - 1].join('\n') + "\n\nPagina: " + seleccion + "/" + paginas.length)
    }
}

function funcionPagina(elArray, num) {
    let pagina = [];
    for (let i = 0; i < elArray.length; i += num) {
        pagina.push(elArray.slice(i, i + num))
    }
    return pagina;
}


async function getListUserOwner(message) {

    let arrayList = [];
    let data = await modelGet('chat').find();

    let datos = data.filter(a => a.owner === message.author.id);

    for (let x of datos) {

        arrayList.push(`${x.name} - ${x.token} - ${x.users.length}/${x.max}${x.admins.includes(message.author.id) ? '[ADMIN]' : '\u200b'}`);

    }

    return arrayList;

}