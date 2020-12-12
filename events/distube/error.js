module.exports = (client, message, err) => {



    if (`${err}`.endsWith('No result!'))
        return message.channel.send('Sin resultados.')
    if (`${err}`.includes('Unsupported URL: '))
        return message.channel.send('URL no soportado.')
    else {
        console.log("Error encontrado: " + err)
        message.channel.send(`${err}`.slice(0, 1900), { code: '' })
    }
}