export const loginController=(req,res,next)=>{
    const {email,password}=req.body;
    console.log(req.body,email,password);

    res.cookie('isLoggedIn','true',{path:'/'})
    res.json("Awesome")
}