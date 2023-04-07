const express = require('express')
const routes = express.Router()
const nodemailer = require("nodemailer")

routes.get('/',(req,res)=>{
    res.send({message:"email section"})
})
var contactMail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'KhadijaCharityFoundation@gmail.com',
    pass:"jicdbhrvwoogmqzh"
    }
});
contactMail.verify((error)=>{
    if(error){
        console.table(error)
    }else{
       console.table({message:"Connected To Mail..."})
    }
})
routes.post("/",(req,res)=>{
const name = req.body.name
const email = req.body.email
const message = req.body.message
var emailto = "H.Nawabi007@gmail.com,naimat10nawabi@gmail.com"
    const mail = {
        from:"KhadijaCharityFoundation@gmail.com",
        to:emailto,
        subject:"Khadija Charity Foundation Website",
        html:`
       <h3>Name: <b>${name}</b></h3>
       <h3>Email: <b>${email}</b></h3>
        Message: <p>${message}</p><br/>
        `
    }
contactMail.sendMail(mail,(error)=>{
if(error){
    // res.status(500).json({Error:"Please Check Your Internet..."})
    console.log({Error:"Please Check Your Internet..."})
}else{
    res.json({message:"We Recieved Your Message"})
}
}); 
})

module.exports = routes