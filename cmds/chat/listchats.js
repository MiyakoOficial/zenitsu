const Discord = require("discord.js")

module.exports = {
    config: {
        name: "listchats",
        alias: [],
        description: "Ver a los chats qu te haz unido",
        usage: "z!listchats",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;


        let seleccion = parseInt(args[0]) || 1;

        if (seleccion < 1) {
            seleccion = 1
        }

        let paginas = funcionPagina((await getListUser(message)), 5);

        if (!paginas || !paginas[0])
            return embedResponse('Ningun chat encontrado.')

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

async function getListUser(message) {

    let arrayList = [];
    let data = await modelGet('chat').find();

    let datos = data.filter(a => a.users.includes(message.author.id));

    for (let x of datos) {

        arrayList.push(`${x.name} - ${x.token} - ${x.users.length}/${x.max}${x.admins.includes(message.author.id) ? '[ADMIN]' : '\u200b'}`);

    }

    return arrayList;

}