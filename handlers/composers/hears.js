const { Composer } = require("telegraf");
const { SearchPostsHandler } = require("../actions/search-posts");

const HearsComposer = new Composer();

HearsComposer.hears(/^(.*)+$/, SearchPostsHandler);

module.exports = {
    HearsComposer,
};