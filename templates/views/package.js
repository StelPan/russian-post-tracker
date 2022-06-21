function package (trackers) {
    let message = ``

    for (let track of trackers) {
        if (
            !track.operation.operDate ||
            !track.operation.operAttr.name
        ) {
            continue;
        }

        message += `${track.operation.operAttr.name} \r\n`;
        message += `${track.operation.operDate} \r\n`;
        message += "- \r\n";
    }

    return message;
}

module.exports = package;

