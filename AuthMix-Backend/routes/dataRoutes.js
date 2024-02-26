import express from "express";
import cookieParser from "cookie-parser";

const router=express.Router();
router.use(cookieParser());;

router.get('/allData',(req,res,next)=>{
    const myCookie = req.cookies.isLoggedIn;
    console.log('Value of myCookie:', myCookie);
    res.json("Okay Okay");
})

export default router