function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function rModel(modelo) {
    return require(`./models/${modelo}.js`)
}

function getUser(client, id) {
    return client.users.cache.get(id) ? client.users.cache.get(id) : 'User unknown';
}

module.exports = {
    capitalize,
    rModel,
    getUser
}