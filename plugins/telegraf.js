const { Telegraf, session } = require("telegraf");

const {
    TELEGRAF_API_KEY
} = process.env;

const app = new Telegraf(TELEGRAF_API_KEY);

app.use(session());

module.exports = { app };