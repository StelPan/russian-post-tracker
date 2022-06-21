const { Markup } = require("telegraf");

const Keyboard = Markup.inlineKeyboard([
    [Markup.button.callback("Отследить посылку", "PACKAGE")],
    [Markup.button.callback("Почтовые отделения рядом", "POSTS_NEAR")],
    [Markup.button.callback("Узнать стоимость поссылки", "COST_PACKAGE")],
    [Markup.button.callback("Часто задаваемые вопросы", "OFTEN_QUESTIONS")]
]);

module.exports = {
    MenuKeyboard: Keyboard
};