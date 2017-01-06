// Execute user submitted JS code in safe VM

const {VM} = require('vm2');
let vm = new VM();

const ZERO_WIDTH_SPACE = String.fromCharCode(8203);

module.exports = {
    trigger: "x",
    action: function (bot, msg, args) {

        let code = args.join(" ");
        let split = code.split("\n");
        code = [];

        // ignore discord code block syntax
        for (let x of split) {
            if (!x.startsWith("```")) code.push(x);
        }

        code = code.join("\n");

        // new instance of VM
        if (code == "new.") {
            vm = new VM();
            msg.channel.sendMessage("```Restarting the VM...```");
            return;
        }

        try {
            var evaled = vm.run(code);
            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);
            msg.channel.sendMessage("```js\n" + clean(evaled) + "\n```"
            );
        } catch (err) {
            msg.channel.sendMessage("`ERROR` ```js\n" + clean(err) + "\n```");
        }
    }
}

function clean(text) {
    if (typeof (text) === "string") {
        return text.replace(/`/g, "`" + ZERO_WIDTH_SPACE).replace(/@/g, "@" + ZERO_WIDTH_SPACE);
    }
    else {
        return text;
    }
}