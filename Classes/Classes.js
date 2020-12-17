class Options {

    constructor(data) {

        this.imageURL = data.imageURL;
        this.footerText = data.footerText;
        this.footerLink = data.footerLink;
        this.title = data.title;
        this.description = data.description;
        this.channel = data.channel
        this.color = data.color ? data.color : '#E09E36'

    }

}
module.exports = Options 