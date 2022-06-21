const { Composer } = require("telegraf");
const Emoji = require("node-emoji");
const {
    PackageEditHandler,
    LoadTrackHandler,
    GoToStartHandler,
    DestroyKeyboardHandler
} = require("../actions/package");
const {
    QuestionThemesEditHandler,
    QuestionsHandler,
    AnswerHandler
} = require("../actions/questions");
const { PostsHandler } = require("../actions/search-posts");

const ActionComposer = new Composer();

//
ActionComposer.action(/^PACKAGE$/, async (ctx) => {
    await ctx.deleteMessage();
    await ctx.scene.enter("TrackerScene");
});

//
ActionComposer.action(/GO_START/, GoToStartHandler);

//
ActionComposer.action(/OFTEN_QUESTIONS/, QuestionThemesEditHandler);

//
ActionComposer.action(/^THEME:(.*)+$/i, QuestionsHandler);

//
ActionComposer.action(/^QUESTION:(.*)$/i, AnswerHandler);

//
ActionComposer.action(/^POSTS_NEAR$/, PostsHandler);

//
ActionComposer.action(/^TRACK:(.*)+$/, LoadTrackHandler);

//
ActionComposer.action(/^COST_PACKAGE$/, async (ctx) => {
   await ctx.answerCbQuery();
   await ctx.reply(`Данная функция находится в разработке.. ${Emoji.get("cry")}`);
});

ActionComposer.action(/^BACK:(.*)+$/, async function (ctx) {
   const action = ctx.update.callback_query.data.split(":")[1];

   if (action === "START") {
       return await GoToStartHandler.call(null, ctx);
   } else if (action === "THEMES") {
       return await QuestionThemesEditHandler.call(null, ctx);
   } else {
       //
   }
});

module.exports = {
    ActionComposer
};