const { Template } = require("./Template");

const template = new Template();

template.add("posts-template", require("./views/render-posts"));
template.add("package-template", require("./views/package"));

module.exports = {
    template
};