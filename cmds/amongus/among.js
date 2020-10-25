const Discord = require("discord.js");
let salasR = new Array();
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "among",//Nombre del cmd
        alias: [], //Alias
        description: "informacion de las salas", //Descripción (OPCIONAL)
        usage: "z!among",
        category: 'among us'
    }, run: async ({ client, message, args, embedResponse }) => {

        function toPages(list, maxPerPage = 10) { // Los parametros de la función, el primero es obligatorio y el segundo opcional (Si no es proporcionado es igual a 10)

            let newList = []; // Un array vació, lo usaremos abajo
            while (list.length) { // Un bucle while, se ejecutará mientras list siga teniendo elementos
                /*
                * Removemos del primer al X (Pongo X ya que esto se puede cambiar en los parametros de la función) elementos con splice (Devuelve los elementos removidos)
                * y lo pusheamos al array declarado previamente
                */
                newList.push(list.splice(0, maxPerPage));
            }; // Cerramos el bucle while
            return newList; // Devolvemos el array que habiamos declarado, este contendrá las páginas ya hechas
        }; // Cerramos la función

        /*
        * Si hay argumentos los tomamos, si no tomaremos una string vacia
        * Seguidamente transformamos los argumentos si es que hay a minúsculas con toLowerCase
        */
        let selection = (args[0] || "").toLowerCase();
        let amongUs = "https://swiftcloud.ml/cloud-WUci.jpg"; // Simple decoración, una imagen del logo de Among Us
        let embed = new Discord.MessageEmbed().setColor(client.color); // Creamos un embed y le damos color, lo usaremos luego
        let allPlaying = message.guild.presences.cache.filter((p) => { // Filtramos las presencias del servidor
            let a = p.activities.find((a) => a.applicationID === "477175586805252107"); // Buscamos una actividad que tenga la ID de Among Us
            if (a && a.party?.id) return true; // Si esta jugando y esta en partida (Esto lo sabemos porque tiene la propiedad id) retornamos true
        }); // Cerramos el filtro

        if (["all", "list", "lista", "listar"].includes(selection)) { // Si el array incluye la selección del usuario

            let allRooms = allPlaying.map((p) => { // Mapeamos las presencias que filtramos previamente
                let a = p.activities.find((a) => a.applicationID === "477175586805252107"); // Buscamos la actividad de Among Us por ID
                if(!salasR.includes(a.party.id)){
salasR.push(a.party.id);
                return `\`\`\`md\n# Among Us\n* : ${a.party?.id}\n> ${a.party.size[0]}/${a.party.size[1]}\`\`\``; // Devolvemos una string con información que nos da la actividad
                }         
  }); // Cerramos el map

            let pages = toPages(allRooms, 20); // Llamamos a la función toPages, uso explicado previamente
            /*
            * Si hay una página que sea igual a la proporcionada por el usuario menos 1 (No importa si no proporciono)
            * nuestra variable será igual a la página que proporciono el usuario menos 1 (Indice pues), en caso
            * contrario la variable será igual a 0 (Primera página)
            */
            let i = pages[Number(args[1]) - 1] ? args[1] - 1 : 0;

            /*
            * Si hay páginas la descripción será la página con un indice equivalente a la variable i
            * En caso contrario será igual a "No hay salas de Among Us en este servidor."
            */
            embed.setDescription(pages[i] || "No hay salas de Among Us en este servidor.")
                /*
                * El footer es simple decoración, Utilizamos un operador ternario para verificar si hay páginas
                * De haberlas le sumamos 1 a la variable i y lo ponemos en el footer, si no será i sin sumar
                * Luego agarramos la longitud de las páginas para que quede "Página X de X."
                */
                .setFooter(`Página ${pages.length ? i + 1 : i} de ${pages.length}.`, amongUs)

            message.channel.send({embed: embed}).catch(e=>{}); // Enviamos el embed

        } else if (["room", "sala"].includes(selection)) { // Si el array incluye la selección del usuario

            if (!args[1]) return embedResponse("Especifica el código."); // Si no hay argumentos retornamos

            let party = allPlaying.filter((p) => { // Filtramos las presencias que filtramos previamente
                let a = p.activities.find((a) => a.applicationID === "477175586805252107"); // Buscamos la actividad de Among Us por ID
                if (a.party.id === args[1].toUpperCase()) return true; // Si se esta jugando una partida con código igual al proporcionado por el usuario retornamos true
            });

            if (!party.first()) return embedResponse("Código invalido."); // Si no encontro ni siquiera una partida retornamos

            let allPlayers = party.map((p, i) => { // Mapeamos las presencias que filtramos previamente
                return `<@${p.userID}>`; // Devolvemos la mención al usuario que esta jugando
            }); // Cerramos el map
            /* 
            * party es una colección con presencias, entonces agarramos la primera con first, accedemos a la propiedad activities
            * y buscamos la actividad de Among Us para acceder a la propiedad party, Mucho texto ¿No?
            */
            let partyInfo = party.first().activities.find((a) => a.applicationID === "477175586805252107").party

            embed.setDescription(allPlayers) // Colocamos la descripción del embed, mencionará a todos los usuarios que estén jugando esa partida y estén en el servidor
                .setFooter(`${partyInfo.size[0]}/${partyInfo.size[1]} jugadores. (Solo muestra usuarios de Discord)`, amongUs); // Ya explicado previamente

            message.channel.send({embed: embed}).catch(E=>{}); // Enviamos el embed

        } else { // Si no uso el comando de forma correcta

           embedResponse("Uso incorrecto, utilice `among all` o `among room <Código>`."); // Enviamos un mensaje
        }; // Cerramos

    }
}
