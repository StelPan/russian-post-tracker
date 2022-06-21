const { Composer } = require("telegraf");

const middleware = new Composer();

middleware.use(require("../../middleware/register-user.middleware"));

module.exports = { middleware };