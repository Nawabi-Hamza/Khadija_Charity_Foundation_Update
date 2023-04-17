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
router.post('/users/edite/:id',UpdateUser)
router.post('/users/edite/admin/:id',UpdateUserAdmin)
router.post('/users/edite/picture/:id',updateUserPicture)
router.post("/users/delete/:id",singleToPostDelete)



module.exports = router;