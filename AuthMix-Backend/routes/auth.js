import express from 'express';
import { loginController } from '../controller/loginController.js';
import bodyParser from "body-parser";



const router= express.Router();
router.use(bodyParser.urlencoded({extended:false}))


router.post('/login',loginController)

export default router;