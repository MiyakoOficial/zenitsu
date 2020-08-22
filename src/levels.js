const Discord = require('discord.js');
let { readdir } = require("fs").promises;

let db_files;
let available_models;

(async () => {
    db_files = await readdir(require("path").join(__dirname, "./models/"));
    available_models = db_files.map(elem => elem.endsWith("js") ? elem.slice(0, -3) : elem);
})();

function getData({ ...search }, db, inexistentSave = true) {
    (async () => {
        if (!search || !db) return;
        if (!available_models.includes(db))
            return console.log("[-] (getData) Se esperaba una colección existente.");

        const db_collection = require(`./models/${db}`);
        const data = await db_collection.findOne(search);
        if (!data && inexistentSave) await createData(search, db);

        return data || {};
    })();
}

function createData(data, db) {
    (async () => {
        if (!data || !db) return;
        if (!available_models.includes(db))
            return console.log("[-] (createData) Se esperaba una colección existente.");

        const db_collection = require(`./models/${db}`);
        let merged = Object.assign({ _id: mongoose.Types.ObjectId() }, data);

        const newData = new db_collection(merged);
        return newData.save().catch(err => console.log(err));
    })();
}

function updateData({ ...search }, { ...settings }, db, saveIfNotExists = true) {
    (async () => {
        if (!search || !settings || !db) return;
        if (!available_models.includes(db))
            return console.log("[-] (updateData) Se esperaba una colección existente.");

        let data = await getData(search, db);
        if (typeof data !== "object") data = {};
        if (!Object.keys(data).length) {
            if (saveIfNotExists)
                return setTimeout(async () => { await updateData(search, settings, db) }, 1000);
            else
                return console.log("[-] (updateData) Si quieres actualizar datos aún así no exista el documento, pon como 4to parámetro en la función: true.");
        }

        for (const key in settings) {
            if (settings.hasOwnProperty(key)) {
                if (data[key] !== settings[key]) data[key] = settings[key];
            }
        }
        return await data.updateOne(settings);
    })();
}



module.exports = {
    levelFunction: async (message) => {

        await getData({ id: `${message.guild.id}_${message.author.id}` }, 'niveles').then(async (data) => {

            let xp = data.xp;
            let nivel = data.nivel;

            let ramdomxp = Math.floor(Math.random() * 14) + 1;

            let levelup = 5 * (nivel ** 2) + 50 * nivel + 100;

            if ((xp + randomxp) > levelup) {

                await updateData({ id: `${message.guild.id}_${message.author.id}` }, { xp: 0 }, 'niveles')
                await updateData({ id: `${message.guild.id}_${message.author.id}` }, { $inc: { nivel: 1 } }, 'niveles')

                let embed = new Discord.MessageEmbed()
                    .setDescription(`Subiste al nivel \`${nivel}\``);
                message.channel.send({ embed: embed })

            }

            else {
                updateData({ id: `${message.guild.id}_${message.author.id}` }, { $inc: { xp: ramdomxp } }, 'niveles')
                console.log(`${message.author.tag} ganó ${randomxp}, es nivel: ${nivel}, xp que tiene: ${xp}`)
            }
        })
    }
};