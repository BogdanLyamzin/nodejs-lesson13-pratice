const express = require("express");

const {authCtrl} = require("../controllers");

const router = express.Router();

router.get("/register", authCtrl.showRegisterPage);

router.post("/register", express.urlencoded({session: false}), authCtrl.registerUser);

router.get("/verify/:verifyCode", authCtrl.verify)

module.exports = router