const express = require('express');
const router = express.Router();

const {handelsignup,handelsignin} = require('../../controller/Auth_Controller/AuthController.js');
const {signupValidation,loginValidation} = require('../../middlewares/AuthValidation.js')


router.route("/signin")
  .post(loginValidation,handelsignin);


router.route("/signup")
  .post(signupValidation,handelsignup);




module.exports = { router };
