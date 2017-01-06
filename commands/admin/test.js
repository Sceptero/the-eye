// Testing admin command

module.exports = {
    trigger: /^test$/,
    action: function(bot, msg, args) {
        msg.channel.sendMessage("test?");
    }
}