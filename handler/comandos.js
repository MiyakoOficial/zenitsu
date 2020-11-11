const { readdirSync } = require("fs")
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command", "Load status");
module.exports = (client) => {
    const load = dirs => {

        const commands = readdirSync(`./cmds/${dirs}/`).filter(d => d.endsWith('.js'));

        for (let file of commands) {
            let carpeta = require(`../cmds/${dirs}/${file}`);

            client.commands.set(carpeta.config.name, carpeta);
            if (carpeta.config.name) {
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> falta un config.name, o config.name no es un string.`);
                continue;
            }

            if (carpeta.config.alias) carpeta.config.alias.forEach(a => client.alias.set(a, carpeta.config.name));
        }
    };
    require('fs')
        .readdirSync('./cmds')
        .filter(a => !a.endsWith('.js'))
        .forEach(x => load(x));

    console.log(table.toString());
};
