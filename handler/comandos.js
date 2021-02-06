const { readdirSync } = require("fs")
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command", "Load status");
module.exports = (client) => {
    const load = dirs => {

        const commands = readdirSync(`./cmds/${dirs}/`).filter(d => {
            return d.endsWith('.js');
        });
        for (let file of commands) {
            try {
                let carpeta = require(`../cmds/${dirs}/${file}`);
                client.commands.set(new carpeta().name, new carpeta());
                if (carpeta.name) {
                    table.addRow(file, '✅');
                } else {
                    table.addRow(file, `❌  -> falta un .name, o .name no es un string.`);
                    continue;
                }
            } catch (e) {
                table.addRow(file, `❌ error: ` + e.message);
            }
        }
    };
    require('fs')
        .readdirSync('./cmds')
        .filter(a => {
            return !a.endsWith('.js');
        })
        .forEach(x => {
            return load(x);
        });

    console.log(table.toString());
};
