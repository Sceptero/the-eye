// Testing admin command

module.exports = {
    trigger: "test",
    action: function (bot, msg, args) {
        msg.channel.sendMessage("☄").then((botMsg) => {
            botMsg.react("🇩").then(() =>
                botMsg.react("🇴").then(() =>
                    botMsg.react("🇵").then(() =>
                        botMsg.react("🇪"))));
        });
    }
}