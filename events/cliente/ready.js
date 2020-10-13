module.exports = async (client) => {
    client.user.setPresence({
        status: "idle",
        activity: {
            name: "z!help",
            type: "WATCHING"
        }
    });
};