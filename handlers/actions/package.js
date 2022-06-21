const path = require("path");
const { user, track } = require(path.resolve("models"));
const { template } = require("../../templates");
const { StartHandler, EditMessageStartHandler } = require("../actions/start");
const { getHistory } = require(path.resolve("services", "russian-post.service"));
const {
    TrackKeyboard,
    TrackDestroyKeyboard,
} = require("../../keyboards/tracks.keyboard");
const CurryHelper = require(path.resolve("handlers", "helpers", "curry"));

/**
 *
 * @param method
 * @param ctx
 * @returns {Promise<void>}
 * @constructor
 */
async function PackageHandler (method, ctx) {
    try {
        const currentUser   = await user.findByPk(ctx.from.id);
        const tracks        = await currentUser.getTracks();

        // await ctx.answerCbQuery();
        await ctx[method]("Введите номер трек-кода: ", TrackKeyboard(tracks));
    } catch (err) {
        console.error(err);
    }
}

const CurryPackageHandler = CurryHelper(PackageHandler);

const PackageReplyHandler = CurryPackageHandler("reply");
const PackageEditHandler = CurryPackageHandler("editMessageText");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 * @constructor
 */
async function GoToStartHandler (ctx) {
    try {
        await ctx.answerCbQuery();
        await EditMessageStartHandler(ctx);
    } catch (err) {
        console.error(err);
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 * @constructor
 */
async function CheckPackage(ctx) {
    try {
        const currentUser   = await user.findByPk(ctx.from.id);

        const message = ctx.message.text;

        const trackCode = await getHistory(message);

        let [createTrackCode, _] = await track.findOrCreate({
            where: { name: message }
        });


        const userTrack     = await currentUser.getTracks({ where: { name: message }});
        if (!userTrack.length) {
            await currentUser.addTrack(createTrackCode);
        }

        const text = template.get("package-template", trackCode);
        await ctx.reply(text);
        // await StartHandler.call(null, ctx);
        await ctx.scene.leave();
    } catch (err) {
        await ctx.reply("Трек-код не найден");
        await StartHandler(ctx);
    }
}

async function LoadTrackHandler(ctx) {
    try {
        // Парсим трек-код из data
        const [_, track] = ctx.update.callback_query.data.split(":");

        // Запрашиваем информацию по трек-коду
        const trackCode = await getHistory(track);

        // Загрушаем шаблон
        // Передаем данные по трек-коду вторым аргументом
        // Получаем уже готовое сообщение для ответа
        const text = template.get(
            "package-template",
            trackCode
        );

        // Отправляем пользователю сообщение
        // И прикрепляем клавиатуру
        await ctx.editMessageText(
            text,
            TrackDestroyKeyboard(track)
        );
    } catch (e) {
        console.error(e);
    }
}

async function DestroyKeyboardHandler(ctx) {
    try {
        const [_, track] = ctx.update.callback_query.data.split(":");
        const currentUser   = await user.findByPk(ctx.from.id);
        const userTracks    = await currentUser.getTracks();

        await currentUser.setTracks(
            userTracks
                .filter(iterator => iterator.name !== track)
                .map(track => track.id)
        );

        await ctx.deleteMessage();
        await ctx.scene.leave();
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    PackageReplyHandler,
    GoToStartHandler,
    PackageEditHandler,
    CheckPackage,
    LoadTrackHandler,
    DestroyKeyboardHandler,
};