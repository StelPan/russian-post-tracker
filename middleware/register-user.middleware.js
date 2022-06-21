const { user } = require("../models");

async function RegisterUserMiddleware (ctx, next) {
    try {
        const [current, create] = await user.findOrCreate({
            where: { id: ctx.from.id }
        });

        if (create) {
            // Регистрация
            await current.update({ data: ctx.from });

            await ctx.reply(
                "Вас привествует бот для отслеживания посылок 'Почта России'."
            );
        }

        await next();
    } catch (e) {
        console.error(e);
    }
}

module.exports = RegisterUserMiddleware;