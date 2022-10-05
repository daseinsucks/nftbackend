const mongoose = require('mongoose');

function handleConnection(res) {
    if (res === null) {
        console.error('FAILED TO CONNECT TO MONGOOSE');
    } else {
        console.log('CONNECTED TO MONGOOSE!');
    }
}

function connectMongooseToCustomURL(url) {
    mongoose.connect(url).then(handleConnection);
}

function connectToOurMongoose() {
    mongoose.connect(
        `mongodb://${process.env.DB_MONGO_HOST}:${process.env.DB_MONGO_PORT}`,
        {
            user: process.env.DB_MONGO_USER,
            pass: process.env.DB_MONGO_PASSWORD,
            dbName: process.env.DB_MONGO_DATABASES,
        },
        handleConnection,
    );
}

function connectMongoose() {
    mongoose.Promise = global.Promise;

    if (process.env.MONGODB_CUSTOM_CONNECTION === "true") {
        connectMongooseToCustomURL(process.env.MONGODB_URL);
    } else {
        connectToOurMongoose();
    }
}

module.exports = {
    connectMongoose,
}