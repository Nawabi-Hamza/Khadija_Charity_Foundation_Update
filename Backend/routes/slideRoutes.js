


const express = require("express")
const routes = express.Router()
// const db = require("../db")
const { showSlideShow, createSlideShow,deleteSlideShow } = require("../controler/slideController")
const { checkToken } = require("../Jsonwebtoken")

// routes.get("/",(req,res)=>{
//     res.send({message:"welcome to slide show"})
// })

routes.get('/',showSlideShow)
routes.post("/",checkToken,createSlideShow)
routes.post("/delete/:id",deleteSlideShow)


module.exports = routes