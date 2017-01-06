// Application entry-point
"use strict";

const Discord = require("discord.js");
const Datastore = require("nedb");

const MessagesHandler = require("./modules/MessagesHandler");


class App {
    constructor() {
        this.bot = new Discord.Client();
        this.bot.db = this.loadDatabase();
        this.bot.config = this.loadConfig();
        this.startLogging();

        this.messagesHandler = new MessagesHandler(this.bot);

        this.bot.login(this.bot.config.token);
    }

    loadDatabase() {
        let db = {
            users: new Datastore({ filename: "db/users", autoload: true }),
            swears: new Datastore({ filename: "db/swears", autoload: true })
        };

        return db;
    }

    loadConfig() {
        let config;
        try {
            config = require("./config.json");
            return config;
        } catch (error) {
            console.error("Couldn't load config.json");
            process.exit(1);
        }
    }

    startLogging() {
        this.bot.on("ready", () => {
            console.log("THE EYE IS LOOKING");
        });

        this.bot.on("error", console.error);
        this.bot.on("warn", console.warn);
        this.bot.on("disconnect", console.warn);
        process.on("uncaughtException", console.error);
        process.on("unhandledRejection", console.error);
    }
}

let app = new App();