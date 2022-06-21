const { tracking } = require("../plugins/russian-post");

async function getHistory(track) {
    const response = await tracking.getHistory(track);
    return response;
}

module.exports = {
    getHistory,
};
