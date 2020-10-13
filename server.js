const Discord = require('discord.js'),
    { Collection } = require('discord.js');

const mongoose = require('mongoose')

const client = new Discord.Client(
    {
        partials: ['MESSAGE', 'REACTION']
    },

    {
        http: { version: 8 }
    }
);
client.queue = new Map();
let { readdirSync } = require('fs');

require('dotenv').config();

["alias", "commands"].forEach(x => client[x] = new Collection()); //Colocamos nuevas colecciones al Cliente
["comandos", "eventos"].forEach(x => require(`./handler/${x}`)(client)); //Hacemos un array con las carpetas que tendrá el handler NO TOCAR.

mongoose.set('useFindAndModify', false)

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("[MongoDB]: Conectado a la base de datos Mongodb.");
}).catch((err) => {
    console.log(`[Error]: No se puede conectar a la base de datos de Mongodb. Error: ${err}`);
});

client.login(process.env.BOT_TOKEN)
    .then(async () => {

        console.log(`Estoy listo, soy ${client.user.tag}`);

    })
    .catch((err) => {

        console.error("Error al iniciar sesión: " + err);

    });

client.getData = async ({ ...find }, model) => {

    const { readdir } = require("fs").promises;
    const db_files = await readdir(require("path").join(__dirname, "./models/"));
    const available_models = db_files.map(elem => elem.endsWith("js") ? elem.slice(0, -3) : elem);

    if (!available_models.includes(model)) return console.log('[GET_DATA]Model no encontrado!')

    let db = require('./models/' + model + '.js');

    let getModel = (await db.findOne(find));

    if (!getModel) {

        await db.create(find)

        return getModel;

    }

    else return getModel || {};

}

client.updateData = async ({ ...find }, { ...newValue }, model) => {

    const { readdir } = require("fs").promises;
    const db_files = await readdir(require("path").join(__dirname, "./models/"));
    const available_models = db_files.map(elem => elem.endsWith("js") ? elem.slice(0, -3) : elem);

    if (!available_models.includes(model)) return console.log('[UPDATE_DATA]Model no encontrado!')

    let db = require('./models/' + model + '.js');

    let getModel = (await db.findOne(find));

    if (!getModel) {

        await db.create(find)

        return await db.findOneAndUpdate(find, newValue, { new: true });

    }

    else {

        return await db.findOneAndUpdate(find, newValue, { new: true });

    }

}

/*
(async () => {

const { readdir } = require("fs").promises;
const db_files = await readdir(require("path").join(__dirname, "./models/"));
const available_models = db_files.map(elem => elem.endsWith("js") ? elem.slice(0, -3) : elem);

client.getData = async ({ ...search }, db, inexistentSave = true) => {
    if (!search || !db) return;
    if (!available_models.includes(db))
        return console.log("[-] (getData) Se esperaba una colección existente, pusiste esta: " + db);

    const db_collection = require(`./models/${db}`);
    const data = await db_collection.findOne(search);
    if (!data && inexistentSave) await client.createData(search, db);

    return data || {};
}

client.createData = async (data, db) => {
    if (!data || !db) return;
    if (!available_models.includes(db))
        return console.log("[-] (createData) Se esperaba una colección existente, pusiste esta: " + db);

    const db_collection = require(`./models/${db}`);
    let merged = Object.assign({ _id: mongoose.Types.ObjectId() }, data);

    const newData = new db_collection(merged);
    return newData.save().catch(err => console.log(err));
}

client.updateData = async ({ ...search }, { ...settings }, db, saveIfNotExists = true) => {
    if (!search || !settings || !db) return;
    if (!available_models.includes(db))
        return console.log("[-] (updateData) Se esperaba una colección existente, pusiste esta: " + db);

    let data = await client.getData(search, db);
    if (typeof data !== "object") data = {};
    if (!Object.keys(data).length) {
        if (saveIfNotExists)
            return setTimeout(async () => { await client.updateData(search, settings, db) }, 1000);
        else
            return null; //console.log("[-] (updateData) Si quieres actualizar datos aún así no exista el documento, pon como 4to parámetro en la función: true.");
    }

for (const key in settings) {
if (settings.hasOwnProperty(key)) {
    if (data[key] !== settings[key]) data[key] = settings[key];
}
}
return await data.updateOne(settings);
}
}) ();
*/
client.remplazar = (texto) => {

    return texto.split('*').join(`\\*`).split('`').join("\\`").split('~').join(`\\~`).split('_').join(`\\_`).split('|').join(`\\|`);

};

client.duration = (ms) => {
    return duration(ms);
}

function duration(segundos) {
    var s = parseInt(segundos) * 1000
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (`${secs}`.length === 1) {
        secs = `0${secs}`;
    };

    if (`${mins}`.length === 1) {
        mins = `0${mins}`;
    };

    if (hrs <= 0) {
        if (mins <= 0) {
            return 0 + ':' + secs;
        } else {
            return mins + ":" + secs;
        }
    } else {
        return hrs + ":" + mins + ":" + secs;
    }
};

global.getData = async ({ ...find }, model) => {

    const { readdir } = require("fs").promises;
    const db_files = await readdir(require("path").join(__dirname, "./models/"));
    const available_models = db_files.map(elem => elem.endsWith("js") ? elem.slice(0, -3) : elem);

    if (!available_models.includes(model)) return console.log('[GET_DATA]Model no encontrado!')

    let db = require('./models/' + model + '.js');

    let getModel = (await db.findOne(find));

    if (!getModel) {

        await db.create(find)

        return getModel;

    }

    else return getModel || {};

}

global.updateData = async ({ ...find }, { ...newValue }, model) => {

    const { readdir } = require("fs").promises;
    const db_files = await readdir(require("path").join(__dirname, "./models/"));
    const available_models = db_files.map(elem => elem.endsWith("js") ? elem.slice(0, -3) : elem);

    if (!available_models.includes(model)) return console.log('[UPDATE_DATA]Model no encontrado!')

    let db = require('./models/' + model + '.js');

    let getModel = (await db.findOne(find));

    if (!getModel) {

        await db.create(find)

        return await db.findOneAndUpdate(find, newValue, { new: true });

    }

    else {

        return await db.findOneAndUpdate(find, newValue, { new: true });

    }

}

client.among = (mensaje, member, canalVoz, canalText, bol) => {
    let color = client.color;

    let message = mensaje;

    if (!canalVoz) return response('Tienes que estar en un canal de voz!', canalText)
        ;

    if (!canalVoz.name.includes('Among Us')) return response('Tienes que estar en el canal llamado: `Among Us`', canalText)
        ;

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') || !member.voice.channel.permissionsFor(client.user).has("MANAGE_CHANNELS")) return response('Tengo que tener el permiso `MANAGE_CHANNELS`!', canalText)
        ;

    let rol = message.guild.roles.cache.find(a => a.name === 'Among Us manager');

    if (!rol) {
        message.guild.roles.create({ data: { name: 'Among Us manager' } });
    }

    if (!rol || !member.roles.cache.has(rol.id)) return response('Tienes que tener el rol llamado: `Among Us manager`!', canalText)
        ;

    if (!message.guild.me.hasPermission('MUTE_MEMBERS') || !member.voice.channel.permissionsFor(client.user).has("MUTE_MEMBERS")) return response('Tengo que tener el permiso `MUTE_MEMBERS`!', canalText)
        ;

    if (!message.guild.me.hasPermission('MANAGE_MESSAGES') || !member.voice.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return response('Tengo que tener el permiso `MANAGE_MESSAGES`!', canalText)
        ;

    if (canalVoz.userLimit < 10) {
        canalVoz.edit({ userLimit: 10 })
    }
    else {
        canalVoz.edit({ userLimit: 10 })
    }

    if (canalVoz.members.size > 15) return response('Hay más de 15 miembros en el canal!', canalText)
        ;

    let p = canalVoz.members.map(a => {
        a.voice.setMute(bol)
    });

    response('<a:cargando:650442822083674112> En proceso!', canalText).then(async (msg) => {
        //msg.delete({ timeout: 5000 })
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .setDescription('Listo!')

        await Promise.all(p);

        msg.edit({ embed: embed }).then(a => { a.delete({ timeout: 5000 }).catch(err => { }) })
        //message.delete({ timeout: 5000 });
    });

}

function response(d, c) {
    let color = client.color;
    let embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setDescription(d)
        .setColor(color)
    return c.send({ embed: embed })
};

client.rModel = (n) => {

    return require(`./models/${n}.js`)

}

global.modelGet = (n) => {
    return client.rModel(n)
}