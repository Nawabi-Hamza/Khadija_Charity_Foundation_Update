require('dotenv').config()
const mysql = require('mysql')
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

db.connect((error)=>{
    if(error) return console.error("The Error: "+error.message)
    console.log("connected to my sql server")
})

module.exports = db