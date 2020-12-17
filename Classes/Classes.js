class Options {
    /**
    * @param {Object} data
    * @param {String} data.imageURL
    * @param {String} data.footerText
    * @param {String} data.footerLink
    * @param {String} data.title
    * @param {String} data.description
    * @param {import('discord.js').TextChannel} data.channel
    * @param {String} data.color
    * @param {String} data.thumbnailURL
    */

    constructor(data) {
        this.imageURL = data.imageURL;
        this.footerText = data.footerText;
        this.footerLink = data.footerLink;
        this.title = data.title;
        this.description = data.description;
        this.channel = data.channel;
        this.color = data.color ? data.color : '#E09E36';
        this.thumbnailURL = data.thumbnailURL
    }

}
module.exports = Options 