const Discord = require("discord.js")

module.exports = {
    config: {
        name: "publiclist",
        alias: [],
        description: "Lista publica de chats",
        usage: "z!publiclist numero_de_pagina",
        category: 'chat'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        const { rModel, color } = client;

        let seleccion = parseInt(args[0]) || 1;

        if (seleccion < 1) {
            seleccion = 1
        }

        let paginas = funcionPagina((await getPublicList(message)), 5)
        if (!paginas[seleccion - 1])
            return embedResponse("Pagina inexistente!")


        return embedResponse(paginas[seleccion - 1].join('\n') + "\n\nPagina: " + seleccion + "/" + paginas.length)



    }
}

async function getPublicList(message) {

    let arrayList = [];
    let datos = await modelGet('chat').find({ type: 'public' });

    for (let x of datos) {

        arrayList.push(`${x.name} - ${x.token} - ${x.users.length}/${x.max}${x.admins.includes(message.author.id) ? '[ADMIN]' : '\u200b'}`);

    }

    return arrayList;

}

function funcionPagina(elArray, num) {
    let pagina = [];
    for (let i = 0; i < elArray.length; i += num) {
        pagina.push(elArray.slice(i, i + num))
    }
    return pagina;
}