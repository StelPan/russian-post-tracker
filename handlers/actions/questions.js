const path = require("path");
const { Markup } = require("telegraf");
const {
    getThemes,
    getQuestionByThemeName,
    getAnswer,
    themes
} = require(path.resolve("services", "russian-post-questions.service"));
const CurryHelper = require(path.resolve("handlers", "helpers", "curry"));

async function ShowThemesHandler (method, ctx) {
    // const themes = getThemes();
    const keyboard = [];

    const keys = Object.keys(themes);
    keys.forEach((theme, index) => {
        keyboard.push([Markup.button.callback(theme, `THEME:${index}`)])
    });

    keyboard.push([Markup.button.callback("Назад", `BACK:START`)]);

    await ctx[method]("Выберите подходящую тему:", Markup.inlineKeyboard(keyboard));
}

const CurryThemesHandler        = CurryHelper(ShowThemesHandler);
const QuestionThemesEditHandler = CurryThemesHandler("editMessageText");
const QuestionThemesHandler     = CurryThemesHandler("reply");

async function QuestionsHandler (ctx) {
    const keys = Object.keys(themes);

    const data = ctx.update.callback_query.data;
    const theme = data.split(":")[1];
    const questions = getQuestionByThemeName(keys[theme]);

    const keyboard = [];
    questions.forEach((question, index) => {
        keyboard.push([Markup.button.callback(question, `QUESTION:${theme}:${index}`)])
    });

    keyboard.push([Markup.button.callback("Назад", `BACK:THEMES`)]);
    await ctx.editMessageText(`Выберите вопрос по теме "${keys[theme]}":`, Markup.inlineKeyboard(keyboard));
}

async function AnswerHandler (ctx) {
    const keys = Object.keys(themes);

    const data = ctx.update.callback_query.data;
    const [_, theme, question] = data.split(":");

    const keysQuestions = Object.keys(themes[keys[theme]]);

    const answer = getAnswer(keys[theme], keysQuestions[question]);

    await ctx.editMessageText(answer, Markup.inlineKeyboard([
        [ Markup.button.callback("Назад", "BACK:THEMES") ]
    ]));
}

module.exports = {
    QuestionThemesHandler,
    QuestionThemesEditHandler,
    QuestionsHandler,
    AnswerHandler
};