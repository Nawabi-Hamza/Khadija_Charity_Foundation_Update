const db = require("../db")


const showSlideShow = (req,res)=>{
    const q = "SELECT * FROM `slideshow` ORDER BY `slide_id` DESC "
    db.query(q,(error,data)=>{
        if(error) return res.status(500).json(error)
        return res.status(200).json(data)
    })
}

const createSlideShow = (req,res)=>{
    const q = "INSERT INTO `slideshow`(`slide_title`, `slide_descrption`, `slide_image`) VALUES (?)"
    const value = [req.body.slide_title,req.body.slide_descrption,req.body.slide_image]
    db.query(q,[value],(error,data)=>{
        if(error) return res.status(500).json(error)
        return res.status(200).json({success:" Your Slideshow Successfuly Uploaded..."})
    })
}

const deleteSlideShow = (req,res)=>{
    const postId = req.params.id;
    const q = "DELETE FROM `slideshow` WHERE `slide_id` = ?"
    db.query(q,postId,(error,data)=>{
        if(error)   return res.status(500).json(error)
        return res.status(200).json({message:" Your Slideshow Deleted Successfuly!"})
    })
}



module.exports = {
    showSlideShow,
    createSlideShow,
    deleteSlideShow
}
