// MessagesHandler module, loads commands from folders and handles execution, uses Karma module
"use strict";

const fs = require("fs");

const Karma = require("./Karma");

module.exports = class MessagesHandler {
    constructor(bot) {
        this.bot = bot;
        this.karma = new Karma();
        this.commands = this.loadCommands();

        this.bot.on("message", this.handleMessage.bind(this));
    }

    loadCommands() {
        let commands = { admin: [], user: [] }, command;

        let userCommandFiles = fs.readdirSync("commands/user/"),
            adminCommandFiles = fs.readdirSync("commands/admin/");

        // load user commands from /commands/user/ directory
        for (let fileName of userCommandFiles) {
            if (fileName.endsWith('.js')) {
                try {
                    command = require('../commands/user/' + fileName);
                    if (command == null || command.trigger == null || command.action == null) throw 'error in command module';
                    commands.user.push(command);
                } catch (error) {
                    console.error('Error occured while loading command from file: ' + fileName);
                }
            }
        }

        // load admin commands from /commands/admin/ directory
        for (let fileName of adminCommandFiles) {
            if (fileName.endsWith('.js')) {
                try {
                    command = require('../commands/admin/' + fileName);
                    if (command == null || command.trigger == null || command.action == null) throw 'error in command module';
                    commands.admin.push(command);
                } catch (error) {
                    console.error('Error occured while loading command from file: ' + fileName);
                }
            }
        }

        return commands;
    }

    handleMessage(msg) {
        this.karma.checkGoodDeed(msg);
        this.karma.checkEvilDeed(msg);

        if (msg.content.startsWith(this.bot.config.adminCommandPrefix)) {
            let args = msg.content.split(" ");
            let cmd = args.shift().substr(1).toLowerCase();

            for (let command of this.commands.admin)
                if (command.trigger === cmd) command.action(this.bot, msg, args);
        } else if (msg.content.startsWith(this.bot.config.userCommandPrefix)) {
            let args = msg.content.split(" ");
            let cmd = args.shift().substr(1).toLowerCase();

            for (let command of this.commands.user)
                if (command.trigger === cmd) command.action(this.bot, msg, args);
        }
    }
}