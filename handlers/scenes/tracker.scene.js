const { Scenes: { BaseScene } } = require("telegraf");
const { StartHandler } = require("../actions/start");
const { CheckPackage, LoadTrackHandler, PackageReplyHandler, DestroyKeyboardHandler} = require("../actions/package");
const { BackKeyboard } = require("../../keyboards/back.keyboard");

const TrackerScene = new BaseScene("TrackerScene");

TrackerScene.enter(PackageReplyHandler);

TrackerScene.action(/^TRACK:(.*)+$/, LoadTrackHandler);

TrackerScene.action(/^DESTROY_TRACK:(.*)+$/, DestroyKeyboardHandler);

TrackerScene.hears(/^(\d{14}|[A-Z]{2}\d{9}[A-Z]{2})$/, CheckPackage);

TrackerScene.hears(/(.*)+/, async function (ctx) {
    try {
        await ctx.reply(
            "Не корректно введен трек-код. Повторите ввод: ",
            BackKeyboard("GO_START")
        );
    } catch (e) {
        console.error(e);
    }
});

TrackerScene.action(/GO_START/, async (ctx) => {
    await ctx.deleteMessage();
    await ctx.scene.leave();
});

async function LeaveHandler (ctx) {
    await StartHandler.call(null, ctx);
}

TrackerScene.leave(LeaveHandler);

module.exports = { TrackerScene };