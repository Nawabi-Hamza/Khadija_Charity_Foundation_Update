// const db = require("./db")
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
const cookieParser = require("cookie-parser")
app.use(cookieParser())
require('dotenv').config()
const port = process.env.PORT || 5000
// const bodyParser = require("body-parser")


// this is for do not stop the server we use cluster
const cluster = require("cluster")
const { checkToken } = require("./Jsonwebtoken")
if(cluster.isMaster){
    for(var i=0; i < 1 ; i++ ){
        cluster.fork()
    }
    cluster.on("exit",(worker)=>{
        console.log("Server "+worker.id+" time down..")
        cluster.fork()
    })
}else{

app.use(cors())


app.get("/",(req,res)=>{
    res.send({message:"welcome Hamza Nawabi To NodeJS"})
    res.end()
})
    
// routes require
const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")
const mail = require("./routes/contactRoutes")
const slideShow = require('./routes/slideRoutes')

// use routes which required
// app.use("/auth",authRoutes)
app.use("/auth",authRoutes)
app.use("/posts",postRoutes)
app.use("/contactMail",mail)
// app.use("/slideshow",slideShow)
/// tooken
// app.use("/auth",authRoutes)
// app.use("/token/posts",postRoutes)
app.use("/contactMail",mail)
app.use("/token/slideshow",slideShow)

// use the cloudinary from other folder
const cloudinary = require("./Cludinary.js")
app.use("/image",cloudinary)
// app.use("/image",cloudinary)


app.listen(port,()=>{
    console.log(`server is running in ${port} port`)
    })      
// this is from cluster
}