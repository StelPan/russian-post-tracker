const path = require("path");
const { dadata } = require(path.resolve("plugins", "dadata"));

async function getPosts(query) {
    const response = await dadata.postalInit(query);
    return response.data;
}

module.exports = {
    getPosts
};