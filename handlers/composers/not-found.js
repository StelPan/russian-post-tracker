const { Composer } = require("telegraf");
const { StartHandler } = require("../actions/start");
const composer = new Composer();

composer.hears(/(.*)+/, async function (ctx) {
    await StartHandler(ctx);
});

module.exports = {
    NotFoundComposer: composer
}