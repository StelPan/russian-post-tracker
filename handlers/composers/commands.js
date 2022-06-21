const { Composer } = require("telegraf");
const { StartHandler } = require("../actions/start");
const { PackageReplyHandler } = require("../actions/package");
const { QuestionThemesHandler } = require("../actions/questions");

const CommandsComposer = new Composer();

CommandsComposer.command("start", StartHandler);

CommandsComposer.command("search_package", async (ctx) => {
    await ctx.scene.enter("TrackerScene");
});

CommandsComposer.command("questions", QuestionThemesHandler);

module.exports = { 
    CommandsComposer
};