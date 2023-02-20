const express = require("express")
const routes = express.Router()
const { 
        getPost3,getPosts,addPost,deletePosts,
        AddComment,ShowCommentByPostId,showTotoalOfComment } = require("../controler/postController")
// routes.get("/",(req,res)=>{
//     res.send("welcome to test")
// })
// show all post
routes.get("/",getPosts)
routes.get("/:id",getPosts)
routes.get("/single/three",getPost3)
routes.post("/",addPost)
routes.delete("/:id",deletePosts)


// Comment Methode
routes.get("/comment/:id",ShowCommentByPostId)
routes.post("/comment",AddComment)
routes.get("/comment/total/:id",showTotoalOfComment)



module.exports = routes;