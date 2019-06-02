function confirmDelimeter(message) {
    return message.slice(-1)[0] === '!';
}

function pushMessage(socket, ids, message) {
    let chain = socket;

    for (const id of ids) {
        chain = chain.to(id);
    }

    chain.emit('message', message);
}

function sendMessage(socket, ids, message) {
    if (confirmDelimeter(message)) {
        pushMessage(socket, ids, message.slice(0, -1));
        return '';
    }

    return message;
}

function join(socket, ids, ecb) {
    socket.join(ids, ecb);
}

function leave(socket, ids, ecb) {
    for (const id of ids) {
        socket.leave(id, ecb);
    }
}

module.exports = (function () {
    return {
        confirmDelimeter,
        pushMessage,
        sendMessage,
        join,
        leave
    };
})();
