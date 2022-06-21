function curry (fn) {
    if (typeof fn !== "function") {
        throw new TypeError("Parameter 'fn' must be a function");
    }

    return function curring (...args) {
        if (fn.length <= args.length) {
            return fn.call(this, ...args);
        } else {
            return curring.bind(this, ...args);
        }
    }
}

module.exports = curry;