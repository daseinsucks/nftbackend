const { SERVER_ERROR } = require("../constants/response_message");

function sendDefault500(res) {
    res.status(500).send({
        message: SERVER_ERROR,
    });
}

function handleRegularDataGetting(res, data) {
    if (data === null) {
        res.send([]);
        return;
    }
    res.send(data);
}

module.exports = {
    handleRegularDataGetting,
    sendDefault500,
};