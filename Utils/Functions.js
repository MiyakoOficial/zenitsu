/**
 * 
 * @param {String} string 
 * @param {Array} array
 * @returns {String}
 * @example
 * replace('tokenn', ['token']) //[PRIVATE]n
 */
module.exports.replace = function (string, array) {

    let res = string;

    for (let i of array) {
        res = res.split(i).join('[PRIVATE]')
    }

    return res;

}

// eslint-disable-next-line no-unused-vars
const Classes = require('./Classes.js');
/**
 * @param {Classes.embedOptions} object 
 * @param {Object} options
 * @param {Number} options.timestamp
 * @returns {Promise<Discord.Message>} 
 */
module.exports.sendEmbed = (object = {}, options = { timestamp: Date.now() }) => {

    let embed = new (require('discord.js')).MessageEmbed()

    let { fields, description, imageURL, footerLink, footerText, color, channel, title, thumbnailURL, authorURL, authorText, authorLink } = object;

    fields && fields.length ? fields.map(a => embed.addField(a[0], a[1], a[2] ? true : false)) : false
    if (description) embed.setDescription(description)
    if (imageURL) embed.setImage(imageURL);
    if (thumbnailURL) embed.setThumbnail(thumbnailURL)
    if (footerLink && footerText) embed.setFooter(footerText, footerLink)
    else {
        if (footerText) embed.setFooter(footerText)
        if (footerLink) embed.setFooter('\u200b', footerLink)
    }
    if (authorText && authorLink && authorURL) embed.setAuthor(authorText, authorLink, authorURL)
    else if (authorText && authorLink) embed.setAuthor(authorText, authorLink)
    embed.setColor(color ? color : '#E09E36')
    if (title) embed.setTitle(title)
    if (options.timestamp) embed.setTimestamp()
    if (!channel || !channel.send) throw new Error('No es un canal valido.');
    return channel.send({ embed: embed });

};