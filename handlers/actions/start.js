const { MenuKeyboard } = require("../../keyboards/menu.keyboard");
const emoji = require("node-emoji");

function StartHandlerConstructor (method) {
    return async function StartHandler(ctx) {
        console.log(ctx.session);

        try {
            await ctx[method](
                `Я электронный помощник Почты России! ${emoji.get("smile")} \r\n` +
                "Я помогу вам отследить отправления, найти ближайшее отделение, а так же ответить на часто задаваемые вопросы",
                MenuKeyboard
            );
        } catch (err) {
            console.error(err);
        }
    }
}

const StartHandler = StartHandlerConstructor("reply");
const EditMessageStartHandler = StartHandlerConstructor("editMessageText");

module.exports = {
    StartHandler,
    EditMessageStartHandler
};