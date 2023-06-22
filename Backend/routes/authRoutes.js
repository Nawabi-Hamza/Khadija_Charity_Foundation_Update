const express = require("express")
const router = express.Router()
const { register,login,logout,
        users,Singleuser,UpdateUser, UpdateUserAdmin, updateUserPicture,
        singleToPostDelete
        } = require("../controler/authCotroller")
const { checkToken } = require("../Jsonwebtoken")
router.get("/",(req,res)=>{
    res.send("this is router from auth")
})

// Regeistreation Methode
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)

// User Methode
router.get('/users',checkToken,users)
router.get('/users/single/:id',checkToken,Singleuser)
router.post('/users/edite/:id',checkToken,UpdateUser)
router.post('/users/edite/admin/:id',checkToken,UpdateUserAdmin)
router.post('/users/edite/picture/:id',updateUserPicture)
router.post("/users/delete/:id",singleToPostDelete)



module.exports = router;