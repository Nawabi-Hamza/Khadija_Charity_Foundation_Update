const db = require("../db")

// ==============show all post if it have id show single post ==============
const getPosts = (req,res)=>{
    const q = req.params.id ? "SELECT * FROM `posts` WHERE post_id = ?" : "SELECT * FROM `posts` ORDER BY post_id DESC"
    db.query(q,[req.params.id],(error,data)=>{
        if(error) return res.status(500).send(error);
        res.status(200).json(data)
    })
}
const getPost3 = (req,res)=>{
     const q = "SELECT * FROM `posts` ORDER BY post_id DESC LIMIT 3"
    db.query(q,(error,data)=>{
        if(error) return res.status(500).json(error)
        return res.status(200).json(data)
    })
}
//===========Delete Post by Id Id===========
const deletePosts = (req,res)=>{
    // console.log("delete posts")
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE post_id = ?"
    db.query(q,postId,(error,data)=>{
        if(error){
            const q = "DELETE FROM comments WHERE post_comment = ?"
            db.query(q,postId,(error,data)=>{
                if(error)   return res.status(500).json(error)
                return res.status(200).json({message:"Your Post Deleted Successfuly!"})
            })
        }
        return res.status(200).json({message:"Your Post Deleted Successfuly!"})
    })
}
//===========Create A Post in Page==========
const addPost = (req,res)=>{
    // console.log("add new post")
    const q = "INSERT INTO `posts`(`post_Image`, `post_title`, `post_description`, `post_phone`, `post_address`, `post_user`) VALUES (?)"
    const value = [req.body.post_Image ,req.body.post_title,req.body.post_description,req.body.post_phone,req.body.post_address,req.body.post_user]
    db.query(q,[value],(error,data)=>{
        if(error) return res.status(500).json(error)
        return res.status(200).json({success:" Your Post Successfuly Uploaded..."})
    })
}
// ============update post by id============
// const updatePost = (req,res)=>{
//     const postId = req.params.id;
//     const q = "UPDATE `posts` SET `post_image` = ?, `post_title` = ?, `post_description` = ?, `post_price` = ?,`post_h_price`= ?, `posts_catgories` = ? WHERE `posts`.`post_id` = ?"
//     // const u_id = 14
//     const value = [req.body.post_image,req.body.post_title,req.body.post_description,req.body.post_price,req.body.post_h_price,req.body.posts_catgories]
//     db.query(q,[ ...value,postId ],(error,data)=>{
//         if(error) return res.status(500).json(error)
//         return res.json(data)
//     })
// }

//  =====================Comment Section========================
// ====All Comments===
const ShowCommentByPostId = (req,res)=>{
    const q =  "SELECT * FROM (comments JOIN users ON comments.user_comment = users.user_id) WHERE comments.post_comment = ?"
    db.query(q,[req.params.id],(error,data)=>{
        if(error) return res.status(500).send(error);
        if(data.length) return res.status(200).json(data)
    })
}
// ===show total of comment
const showTotoalOfComment = (req,res)=>{
    const q =  "SELECT COUNT(*) AS total FROM comments JOIN users ON comments.user_comment = users.user_id WHERE comments.post_comment = ?"
    db.query(q,[req.params.id],(error,data)=>{
        if(error) return res.status(500).send(error);
        if(data.length) return res.status(200).json(data)
    })
}
// ====show One Categories====
const AddComment = (req,res)=>{
    const q =  "INSERT INTO `comments`(`comment`, `user_comment`, `post_comment`) VALUES (?)"
    const value = [req.body.comment,req.body.user_comment,req.body.post_comment]
    db.query(q,[value],(error,data)=>{
        if(error) return res.status(500).send(error);
        return res.status(200).json({success:"Your Comment Successfuly Added ..."})
    })
    // res.send("welcome")
}
// DELETE FROM `comments` WHERE `comments`.`comment_id` = ?

const deleteComment = (req,res)=>{
    // console.log("delete posts")
    const postId = req.params.id;
    const q = "DELETE FROM `comments` WHERE `comments`.`comment_id` = ?"
    db.query(q,postId,(error,data)=>{
        if(error)   return res.status(500).json(error)
        return res.status(200).json({message:" Your Post Deleted Successfuly!"})
    })
        
}

module.exports = {
    getPost3, getPosts,deletePosts,addPost
    ,
    AddComment,ShowCommentByPostId,showTotoalOfComment,deleteComment
}