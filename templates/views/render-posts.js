module.exports = function (posts = []) {
    let message = posts.length ? "Почтовые отделения рядом: \r\n" : "Почтовые отделения отсутствуют.";

    if (!posts.length) {
        return message;
    }

    for (let post of posts) {
        message += `Адрес: ${post.unrestricted_value} \r\n`;
        message += `Почтовый индекс: ${post.value} \r\n`
        message += "- \r\n"
    }

    return message;
}