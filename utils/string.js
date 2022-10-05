module.exports = {
    getStringFromInfo: function (info, key) {
        const infoProbably = info.find((info) => info.indexOf(key) === 0);
        return typeof infoProbably === 'string' ? infoProbably.substring(key.length) : '';
    }
};