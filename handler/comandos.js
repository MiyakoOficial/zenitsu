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
            let carpeta = require(`../cmds/${dirs}/${file}`);

            if (carpeta.config.category == 'developer') {
                carpeta.config.dev = true
            }

            carpeta.config.cooldown = carpeta.config.cooldown || 4;

            client.commands.set(carpeta.config.name, carpeta);
            if (carpeta.config.name) {
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> falta un config.name, o config.name no es un string.`);
                continue;
            }

            if (carpeta.config.alias) carpeta.config.alias.forEach(a => {
                return client.alias.set(a, carpeta.config.name);
            });
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
