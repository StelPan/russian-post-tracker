const { Markup } = require("telegraf");

function BackKeyboard(name) {
    return Markup.inlineKeyboard([
        [ Markup.button.callback("Назад", name) ]
    ])
}

module.exports = {
    BackKeyboard,
};