const User = require("../models/user.model.js");
const { ethers } = require('ethers');
const CRYPT_DECRYPT_MESSAGES = {
    create: "CREATE USER",
    update: "UPDATE USER",
};

const SERVER_ERROR = "SERVER_ERROR";

function createUser({ address, name, owns, picture }) {
    const message = new User({
        address,
        name: name ? name : 'Unnamed',
        picture: picture ? picture : '#',
        verified: false,
        first_visit: new Date(),
        last_visit: new Date(),
        author: [],
        owns: owns ? owns : [],
        socials: [],
    });
    return message.save();
}

exports._create = ({ address, name, owns }) => createUser({ address, name, owns });

exports.create = (req, res) => {
    const { signature } = req.body;
    const signedAddr = ethers.utils.verifyMessage(CRYPT_DECRYPT_MESSAGES.create, signature);
    if (signedAddr !== req.body.address) {
        res.status(401).send({
            message: "The message has not been encrypted",
        });
        return;
    }
    createUser({
        address: req.body.address,
        name: req.body.name ? req.body.name : 'Unnamed',
        picture: req.body.picture ? req.body.picture : '#',
    }).then((data) => {
        res.send(data);
    }).catch(() => {
        res.status(500).send({
            message: SERVER_ERROR,
        });
    });
};

// Retrieve all messages from the database.
exports.getUser = (req, res) => {
    User.findOne({ address: req.query.address })
        .then((data) => {
            if (data === null) {
                res.send({});
                return;
            }
            const fields = ['address', 'author', 'name', 'picture', 'socials', 'verified', 'other'];
            const toReturn = Object.fromEntries(fields.map((field) => [field, data[field]]));
            res.send(toReturn);
        })
        .catch(() => {
            res.status(500).send({
                message: SERVER_ERROR,
            });
        });
};

exports.getOwnersByMasterId = (req, res) => {
    User.find({ owns: req.query.master_id })
        .then((data) => {
            if (data === null) {
                res.send({});
                return;
            }
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: SERVER_ERROR,
            });
        });
}

exports.update = (req, res) => {
    const { signature } = req.body;
    const signedAddr = ethers.utils.verifyMessage(CRYPT_DECRYPT_MESSAGES.update, signature);
    if (signedAddr !== req.body.address) {
        res.status(401).send({
            message: "The message has not been encrypted",
        });
        return;
    }
    User.findOneAndUpdate(
        { address: req.body.address },
        req.body,
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "User not found",
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "User not found",
                });
            }
            return res.status(500).send({
                message: "Server error",
            });
        });
};