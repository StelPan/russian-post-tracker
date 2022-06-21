const path = require("path");
require("dotenv").config({
    path: "./.env"
});

const { app } = require(path.resolve(
    "plugins",
    "telegraf"
));

const { CommandsComposer } = require("./handlers/composers/commands");
const { ActionComposer } = require("./handlers/composers/actions");
const { HearsComposer } = require("./handlers/composers/hears");
const { NotFoundComposer } = require("./handlers/composers/not-found");
const { middleware } = require("./handlers/composers/middleware.composer");
const { ScenesComposer } = require("./handlers/composers/scenes.composer");

app.use(middleware);
app.use(ScenesComposer);
app.use(CommandsComposer);
app.use(ActionComposer);
app.use(HearsComposer);
app.use(NotFoundComposer);

app.launch()
    .then(() => console.log("Bot started..."))
    .catch((err) => console.error(err));