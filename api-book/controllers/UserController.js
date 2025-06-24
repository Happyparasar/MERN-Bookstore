const User = require('../models/User');
const jwt = require("jsonwebtoken");
async function addUser(req, res) {

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).send({ success: false, message: 'User Already Exsists..' })
        } else {
            user = new User(req.body);
            await user.save();
            res.status(200).send({ success: true });
        }
    } catch (err) {
        console.log(err);
    }
}
async function getUsers(req, res) {
    try {
        let users = await User.find({});
        console.log(users, 'users');
        res.status(200).send({ success: true, data: users });
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, data: {} });
    }
}
async function getUser(req, res) {
    try {
        let id = req.params.id;
        let user = await User.findOne({ _id: id });
        res.status(200).send({ success: true, data: user });
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ success: false });
    }
}
async function doLogin(req, res) {
    try {
        console.log(req.body, 'req.body')
        let secret_key = 'b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU';
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).send({ success: false, message: 'User does not exists' })
        } else {
            if (user.password === req.body.password) {
                user.lastLogin = new Date();
                await user.save();
                const token = jwt.sign({ id: user._id, email: user.email }, secret_key, {
                    expiresIn: "1h"
                });
                console.log(token);
                res.status(200).send({ success: true, message: "login success", token: token, data: user });
            } else {
                res.status(400).send({ success: false, message: 'Wrong Password...' });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({ success: false, message: 'Something went wrong..' });
    }
}

async function editUser(req, res) {
    try {
        let id = req.params.id;
        console.log(req.body)

        let user = await User.findOne({ _id: id });
        user.status = req.body.status;
        user.save();
        res.status(200).send({ sucess: true });
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ sucess: false })

    }
}
module.exports = {
    addUser,
    getUsers,
    doLogin,
    getUser,
    editUser,
}