
const jwt = require("jsonwebtoken")
const mysql = require("mysql")
const db = require("../db")
const bcrypt = require("bcryptjs")
const cookie = require("cookie-parser")

// =================System Authentication===================
// Register Section 
const register = (req,res)=>{
    // check if user already exist
    const q = "SELECT * FROM users WHERE user_email = ? OR user_name = ?"
    db.query(q,[req.body.user_email,req.body.user_name],(error,data)=>{
        if(error) return res.status(500).json(error)
        if(data.length) return res.status(409).json({error:"User Already Exist Please Select Deferent User Name And Email!"})
 
        // if check is be false or user not be in database the user will be register
        const q = "INSERT INTO `users`( `user_name`, `user_email`, `user_password`, `user_type`) VALUES (?) ;"
        // to hash password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.user_password,salt)

        const values = [req.body.user_name,req.body.user_email,hash,req.body.user_type]
        db.query(q,[values],(error,data)=>{
            if(error) return res.status(500).json(error)
            return res.status(200).json(({success:"User Created Successfully"}))
        })
                           
    })
}

// === Login Section ===
const login = (req,res)=>{
    const q = "SELECT * FROM users WHERE user_name = ? "
    db.query(q,[req.body.user_name],(error,data)=>{
        if(error) return res.status(500).json(error)
        if(data.length === 0) return res.status(404).json({error:"User Is Not Registered Please first Register..."})

        const isPasswordCorrect = bcrypt.compareSync(req.body.user_password,data[0].user_password)

        if(!isPasswordCorrect) return res.status(400).json({error:"please type correct password"})

        const token = jwt.sign({id:data[0].id},"jwtkey123")
        // to hide password just show user name and email
        const {user_password , ...other} = data[0]
        res.cookie("access-token",token,{
            httpOnly:true
        // }).status(200).json(data[0])
         }).status(200).json(other)
    })
}

 // === Logout User===
const logout = (req,res)=>{
    res.clearCookie("access_token",{
    sameSite:"none",
    secre:true,
    }).status(200).json({message:"user logout successfuly"})
}

// =================Users Controler===================

// show all user
const users = (req,res)=>{
    const q = "SELECT * FROM users"
    db.query(q,(error,data)=>{
        if(error) return res.status(500).json(error)
        if(data.length) return res.status(200).json(data)
        if(!data.length) return res.status(404).json({message:"User Is Not Registerd"})                   
    })
}
// find Single User
const Singleuser = (req,res)=>{
    const q = "SELECT * FROM users WHERE user_id = ? "
    // const value = [req.body.name,req.body.email]
    db.query(q,[req.params.id],(error,data)=>{
        if(error) return res.status(500).json(error)
        if(data.length) return res.status(200).json(data)          
        if(!data.length) return res.status(404).json({message:"User Is Not Registerd"})
    })
}
// delete users if user have comment or post
const singleToPostDelete = (req,res)=>{
    const q1 = "DELETE FROM `users` WHERE `users`.`user_id` = ?"
    const id = req.params.id
    db.query(q1,[id],(error,data)=>{
        // if(error){
            const q = "DELETE FROM `comments` WHERE `comments`.`user_comment` = ?"
            db.query(q,[id],(error,data)=>{
                // if(error) return res.status(500).json(error)
                // else {
                    const q2 = "DELETE FROM `posts` WHERE `post_user` = ?"
                    db.query(q2,id,(error,data)=>{
                        if(error) {return res.status(500).json(error)}
                        else return res.status(200).json({message:"User Deleted Successfuy"})
                    }) 
                // }    
            }) 
        // }
        // else return res.status(200).json({message:"User Deleted Successfuy"})
    }) 
}
// update user
const UpdateUser = (req,res)=>{
    q = "UPDATE `users` SET `user_name`=?,`user_email`=?,`user_password`=?,`user_type`=? ,`user_image`=? WHERE `users`.`user_id` = ?"
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.user_password,salt)
    const id = req.params.id
    const value = [req.body.user_name,req.body.user_email,hash,req.body.user_type,req.body.user_image]
    db.query(q,[ ...value,id ],(error,data)=>{
        if(error) return res.status(500).json("user is not in system")
        return res.json(data)
    })
}
// update user from simple user to admin user
const UpdateUserAdmin = (req,res)=>{
    q = "UPDATE `users` SET `user_type`= ? WHERE `users`.`user_id` = ?"
    const value = [ req.body.user_type ]
    const id = req.params.id
    db.query(q,[...value, id ],(error,data)=>{
        if(error) return res.status(500).json("user is not in system")
        return res.json(data)
    })
}
// update just picture of user
const updateUserPicture = (req,res)=>{
    q = "UPDATE `users` SET `user_image`= ? WHERE `users`.`user_id` = ?"
    const value = [ req.body.user_image ]
    const id = req.params.id
    db.query(q,[...value, id ],(error,data)=>{
        if(error) return res.status(500).json("user is not in system")
        return res.json(data)
    })
}
module.exports = {
   register:register,
   login:login,
   logout:logout,
   users:users,
   Singleuser:Singleuser,
   UpdateUser:UpdateUser,
   UpdateUserAdmin:UpdateUserAdmin,
   updateUserPicture:updateUserPicture,
   singleToPostDelete:singleToPostDelete
}