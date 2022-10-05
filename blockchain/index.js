require('dotenv').config();
const Web3 = require('web3');
const MasterController = require('../controllers/master.controller');
const abi_masterFactory721 = require('./abi/MasterFactory721.json');
const abi_MSNFT = require('./abi/MSNFT.json');

const web3Instance = new Web3(new Web3.providers.WebsocketProvider(`wss://${process.env.NETWORK_NAME}.infura.io/ws/v3/${process.env.INFURA_ID}`));
const masterFactory721 = new web3Instance.eth.Contract(abi_masterFactory721, process.env.ADDRESS_MASTER_FACTORY);
const MSNFT = new web3Instance.eth.Contract(abi_MSNFT, process.env.ADDRESS_MSNFT);

const fetch = require('node-fetch');
const { saveMasterImages } = require("../utils/network");

function getAuthor(master_id) {
    return MSNFT.methods.get_author(master_id).call();
}

function handleCreatedSale() {
    masterFactory721.events.SaleCreatedHuman({})
        .on('data', (event) => MasterController.setPrice(event.returnValues))
        .on('error', console.error);
}

function setNewItemInfo(event) {
    fetch(`https://ipfs.io/ipfs/${event.returnValues.link}`)
        .then((data) => {
            data.json().then((readData) => {
                saveMasterImages(readData, event.returnValues.master_id);
                getAuthor(event.returnValues.master_id)
                    .then((author) => {
                        MasterController.create({
                            ...event.returnValues,
                            thumbnail: readData[0],
                            author,
                        });
                    });
            });
        })
        .catch(() => {
            MasterController.create(event.returnValues);
        });
}

function handleCreatedItem() {
    masterFactory721.events.CreateMasterItem({})
        .on('data', setNewItemInfo)
        .on('error', console.error);
}

function handleBoughtItem() {
    MSNFT.events.ItemBoughtHuman({})
        .on('data', (event) => MasterController.handleBuying(event.returnValues))
        .on('error', console.error);
}

function launchEvents() {
    handleCreatedItem();
    handleCreatedSale();
    handleBoughtItem();
}

module.exports = launchEvents;