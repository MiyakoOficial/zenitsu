function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function rModel(modelo) {
    return require(`./models/${modelo}.js`)
}

module.exports = {
    capitalize,
    rModel
}