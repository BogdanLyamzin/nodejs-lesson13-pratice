const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
    email: {
        type: String,
        required: [true, "Email must be exist"],
        unique: true
    },
    password: {
        type: string,
        required: true
    },
    verify: {
        type: Boolean,
        default: false
    },
    verifyCode: {
        type: String,
        required: true,
    }
});

userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};
  
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;