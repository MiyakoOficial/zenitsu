const ms = require('ms');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function rModel(modelo) {
    return require(`./models/${modelo}.js`)
};

function getUser(client, id) {
    return client.users.cache.get(id) ? client.users.cache.get(id) : 'User unknown';
};

function Hora() {
    fecha = new Date(Date.now() - ms('4h'));
    hora = fecha.getHours();
    minutos = fecha.getMinutes();
    segundos = fecha.getSeconds();

    if (hora < 10) {
        hora = `0${hora}`
    }
    if (minutos < 10) {
        minutos = `0${minutos}`
    }
    if (segundos < 10) {
        segundos = `0${segundos}`
    }

    return `${hora}:${minutos}:${segundos}`
};

module.exports = {
    capitalize,
    rModel,
    getUser,
    Hora
};