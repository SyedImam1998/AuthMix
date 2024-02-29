
const express= require('express');
const { jwtLoginController, jwtSignupController } = require('../controller/jwtAdminController');
const bodyParser = require('body-parser');



const router =express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/jwtLogin',jwtLoginController);

router.post('/jwtSignUp',jwtSignupController);








module.exports=router;