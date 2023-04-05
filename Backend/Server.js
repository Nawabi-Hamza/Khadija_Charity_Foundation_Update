const db = require("./db")
const express = require("express")
const multer = require("multer")
const cors = require("cors")
const app = express()
app.use(express.json())
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const port = 5000
// const bodyParser = require("body-parser")

// this is for do not stop the server we use cluster
const cluster = require("cluster")
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
})
    

// routes require
const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")
const mail = require("./routes/contactRoutes")
const slideShow = require("./routes/slideRoutes")


// use routes which required
app.use("/auth",authRoutes)
app.use("/posts",postRoutes)
app.use("/contactMail",mail)
app.use("/slideshow",slideShow)



// use the cloudinary from other folder
const cloudinary = require("./Cludinary")

app.use("/image",cloudinary)



// ================Upload Image in Database in different table==================
        // make diskStorage or create storage
        // const storage = multer.diskStorage({ 
        //     destination:(req,file,cb)=>{
        //         cb(null,"../Frontend/public/upload")
        //     },
        //     filename:(req,file,cb)=>{
        //         cb(null,Date.now()+ file.originalname)
        //     }
        // })
        // // upload Image 
        // const upload = multer({storage})
        // // make api for send image from postman or frontend
        // app.post("/upload",upload.single("file"),(req,res)=>{
        //     const file = req.file;
        //     res.status(200).json(file.filename)
        //     console.log("Image Uploaded...")
        // })


app.listen(port,()=>{
    console.log(`server is running in ${port} port`)
    })      
// this is from cluster
}

