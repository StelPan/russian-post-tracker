const path = require("path");
const { getPosts } = require(path.resolve("services", "posts.service"));
const { template } = require(path.resolve("templates"));
const { StartHandler } = require(path.resolve("handlers", "actions", "start"));

async function SearchPostsHandler (ctx, next) {
    try {
        if (!ctx.session?.isPostsSearch) {
            return next();
        }

        ctx.session.isPostsSearch = undefined;
        delete ctx.session.isPostsSearch;

        const address = ctx.message.text;
        const posts = await getPosts(address);
        const message = template.get("posts-template", posts.suggestions);
        await ctx.reply(message);
        await StartHandler(ctx);
    } catch (e) {
        console.error(e);
    }
}

async function PostsHandler (ctx) {
    ctx.session ??= {};
    ctx.session.isPostsSearch = true;

    await ctx.answerCbQuery();
    await ctx.editMessageText("Пример: г Кемерово, ул Сибиряков-Гвардейцев \r\nВведите адрес:");
}

module.exports = {
    SearchPostsHandler,
    PostsHandler
};