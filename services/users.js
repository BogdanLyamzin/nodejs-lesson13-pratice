const {User} = require("../models");
const {v4} = require("uuid");

const getOne = (obj)=> {
    return User.findOne(obj)
}

const add = async ({email, password})=> {
    try {
        const newUser = new User({email, verifyCode: v4()});
        newUser.setPassword(password);
        return newUser.save();
    }
    catch(error){
        next(error);
    }
}

const update = ({_id, ...user}) = {
    return User.findByIdAndUpdate(_id, user);
}

module.exports = {
    getOne
}