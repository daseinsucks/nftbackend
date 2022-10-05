const express = require('express');
const cors = require('./middleware/cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const launchEvents = require('./blockchain/index');
const {connectMongoose} = require("./utils/database");
require('dotenv').config();

const app = express();

connectMongoose();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors);

app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

routes(app);

launchEvents();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});