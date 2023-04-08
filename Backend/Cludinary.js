const express = require("express")
const multer = require("multer")
const cloudinary = require('cloudinary').v2;
const bodyParser = require("body-parser")
require("dotenv").config()

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json()) 

// make storage for image
const storage = multer.diskStorage({});
// single upload
const upload = multer({ storage });
// multiple upload up to 10
const uploads = multer({ storage }).array("images",10);

// Configuration My Api keys from cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


// get all from cloudinary
router.get("/uploads",(req,res)=>{
  // res.send("HLDSJFlsdfkj")
    cloudinary.api.resources(function(error, result) {
        if (error) {
          res.send(error);
        } else {
          res.send(result);
        }
    })
})


// upload single
router.post('/upload', upload.single('image'), (req, res) => {
    const path = req.file.path;
    cloudinary.uploader.upload(path, { folder: 'uploads' }, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  });


//   upload multiple images 
  router.post('/uploads', uploads, (req, res) => {
    const files = req.files;
    const results = [];
    for (const file of files) {
      const path = file.path;
      cloudinary.uploader.upload(path, { folder: 'uploads' }, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          results.push(result);
  
          if (results.length === files.length) {
            res.status(200).json(results);
          }
        }
      });
    }
  });


// delete from cloudinary image
router.delete('/delimage/:id',(req,res)=>{
    const id = req.params.id
    const publicId = `uploads/${id}`;
    // const publicId = req.params;
    cloudinary.uploader.destroy(publicId,(error, result) => {
    if (error) {
        res.send(error);
    } else {
        res.send(result);
    }
    });
    
})


  module.exports = router