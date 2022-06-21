function Template () {
    this.templates = new Map();

    this.add = function (name, fn) {
        if (typeof fn !== "function") {
            throw new Error("'fn' must be a function type.");
        }

        this.templates.set(name, fn);
    }

    this.get = function (name, ...args) {
        const template = this.templates.get(name);
        return template.call(this, ...args);
    }
}

module.exports = {
    Template
}

