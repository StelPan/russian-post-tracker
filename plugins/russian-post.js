const { Tracking }  = require("russian-post");

const {
    RUSSIAN_POST_LOGIN,
    RUSSIAN_POST_PASSWORD,
} = process.env;

const tracking = new Tracking({
    login: RUSSIAN_POST_LOGIN,
    password: RUSSIAN_POST_PASSWORD
});

module.exports = {
    tracking,
};

