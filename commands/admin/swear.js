// Testing admin command

module.exports = {
    trigger: "swear",
    action: function(bot, msg, args) {
        msg.channel.sendMessage("test?");
    }
}