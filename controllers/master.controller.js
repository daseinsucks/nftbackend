const Master = require("../models/master.model");
const User = require("../models/user.model");
const UserController = require('./user.controller');
const { getStringFromInfo } = require('../utils/string');
const {sendDefault500, handleRegularDataGetting} = require("../utils/response");

function decreaseAmount(master_id) {
    Master.findOne({ master_id })
        .then((data) => {
            if (data === null) {
                throw new Error('Nothing to decrease');
            }
            const { amount } = data;
            return Master.findOneAndUpdate({ master_id }, {
                    amount: amount - 1,
                }).then(() => null)
                    .catch(() => null)
        })
        .catch(() => new Error('Could not decrease'));
}

exports.create = ({ link, _description, _supplyType, master_id, author, thumbnail }) => {
    try {
        const splittedInfo = _description.split('_MSNFT_');
        const title = getStringFromInfo(splittedInfo, 'title=');
        const description = getStringFromInfo(splittedInfo, 'description=');
        const external = getStringFromInfo(splittedInfo, 'external=');
        const categories = getStringFromInfo(splittedInfo, 'categories=').split(',').map((category) => Number(category));
        const master = new Master({
            title,
            description,
            external,
            categories,
            link,
            master_id,
            author,
            amount: _supplyType,
            total: _supplyType,
            thumbnail,
            created_at: +new Date(),
        });
        master.save();
    } catch (e) {
        console.log('e: ', e);
    }
};

exports.setPrice = ({ price, currency, master_id }) => {
    Master.findOneAndUpdate({ master_id }, {
        price,
        currency: Number(currency),
    })
        .then(() => null )
        .catch(() => null )
};

exports.handleBuying = ({ buyer, master_id }) => {
    User.findOne({ address: buyer })
        .then((data) => {
            if (data === null) {
                UserController._create({ address: buyer, name: 'Unnamed', owns: [master_id] })
                    .then(() => decreaseAmount(master_id))
                    .catch(() => null);
            } else {
                const owns = data.owns;
                owns.push(master_id);
                User.findOneAndUpdate({ address: buyer }, { owns })
                    .then(() => decreaseAmount(master_id))
                    .catch(() => null);
            }
        })
}

exports.getSales = (req, res) => {
    const filter = {
        $or: [
            { total: { $eq: 0 }, amount: { $eq: 0 } },
            { amount: { $gte: 1 } }
        ],
    }
    const { category } = req.query;
    if (category) {
        filter.categories = {
            "$in": [Number(category)]
        };
    }
    Master.find(filter)
        .then((data) => handleRegularDataGetting(res, data))
        .catch(() => sendDefault500(res));
};

exports.getByMasterId = (req, res) => {
    Master.findOne({ master_id: req.query.master_id })
        .then((data) => handleRegularDataGetting(res, data))
        .catch(() => sendDefault500(res));
};

exports.getOwnedIds = (req, res) => {
    const { address } = req.query;
    User.findOne({ address })
        .then((user) => res.send(user.owns))
        .catch(() => sendDefault500(res));
};

exports.getMasterByCid = (req, res) => {
    const { cid } = req.query;
    Master.findOne({ link: cid })
        .then((data) => handleRegularDataGetting(res, data))
        .catch(() => sendDefault500(res));
};

exports.search = (req, res) => {
    const { info } = req.query;
    const $regex = new RegExp(info, 'i');
    Master.find({ title: { $regex } })
        .then((data) => handleRegularDataGetting(res, data))
        .catch(() => sendDefault500(res));
}

exports.getWorks = (req, res) => {
    Master.find({ author: req.query.author })
        .then((data) => handleRegularDataGetting(res, data))
        .catch(() => sendDefault500(res));
};

exports.getLatest = (req, res) => {
    const { limit, offset, sort, category } = req.query;
    const filter = {};
    if (category && Number(category) !== -1) {
        filter.categories = {
            "$in": [Number(category)]
        };
    }
    Master.find(filter)
        .sort({
            created_at: Number(sort) === 0 ? -1 : 1
        })
        .skip(Number(offset) || 0)
        .limit(Number(limit) || 3)
        .then((data) => handleRegularDataGetting(res, data))
        .catch(() => sendDefault500(res));
};