const {userServices} = require("../services");
const sgMail = require('@sendgrid/mail');
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const showRegisterPage = (req, res, next)=>{
    res.render("pages/register");
}

const registerUser = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await userServices.getOne({email});
        if(user) {
            res.status(400).json({
                status: "error",
                code: 400,
                message: "Such email is already exist in database"
            })
        }
        const newUser = await userServices.add({email, password});
        const msg = {
            to: email,
            from: 'info@our-site.com',
            subject: 'Verify your email',
            text: 'Click to link',
            html: `<a href="https://our-site.com/verify/${newUser.verifyCode}>Верифицируйте свой email</a>`,
          }

          await sgMail.send(msg);

          res.redirect("/login");
    }
    catch(error){
        next(error);
    }
}

const verify = async (req, res, next)=> {
    const {verifyCode} = req.params;
    try {
        const user = await userServices.getOne({verifyCode});
        if(!user || user.verify){
            res.render("pages/verify-error");
        }
        /*
        user = {
            _id: "fgsdff34",
            email: "bogdan@gmail.com",
            password: "gfgw4",
            verify: false,
            verifyCode: "4524235234"
        }
        */
        user.verify = true;
        const {verifyCode: code, ...verifyUser} = user;
        const result = await userServices.update(verifyUser);
        res.render("verify-success");
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    showRegisterPage,
    registerUser
}