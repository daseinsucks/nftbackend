require('dotenv').config();
const cors = require('cors');

const whitelist = ['https://dev.moonshard.io'];
if (process.env.ENVIRONMENT === 'development') {
    whitelist.push('http://localhost:3000');
}
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

module.exports = cors(corsOptions);