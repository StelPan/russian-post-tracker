const { Composer, Scenes: { Stage } } = require("telegraf");

const stage = new Stage([
    require("../scenes/tracker.scene").TrackerScene
]);

const ScenesComposer = new Composer();

ScenesComposer.use(stage.middleware());

module.exports = { ScenesComposer };
