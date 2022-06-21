const { Markup } = require("telegraf");

function TrackKeyboard(tracks) {
    let keyboard = [];
    for (let track of tracks) {
        keyboard.push(Markup.button.callback(track.name, `TRACK:${track.name}`));
    }

    return Markup.inlineKeyboard(keyboard);
}

function TrackDestroyKeyboard(track) {
    return Markup.inlineKeyboard([
        [ Markup.button.callback("Удалить трэк-код", `DESTROY_TRACK:${track}`) ],
        [ Markup.button.callback("Назад", `GO_START`) ],
    ]);
}

module.exports = {
    TrackKeyboard,
    TrackDestroyKeyboard,
};