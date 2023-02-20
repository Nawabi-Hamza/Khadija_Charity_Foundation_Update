const express = require("express")
const router = express.Router()
const { register,login,logout,
        users,Singleuser,UpdateUser, UpdateUserAdmin, updateUserPicture,
        singleToPostDelete
        } = require("../controler/authCotroller")
router.get("/",(req,res)=>{
    res.send("this is router from auth")
})

// Regeistreation Methode
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)

// User Methode
router.get('/users',users)
router.get('/users/single/:id',Singleuser)
router.patch('/users/:id',UpdateUser)
router.patch('/users/admin/:id',UpdateUserAdmin)
router.patch('/users/picture/:id',updateUserPicture)
router.delete("/users/delete/:id",singleToPostDelete)



module.exports = router;