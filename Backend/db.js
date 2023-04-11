var mysql = require('mysql');

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    connectionLimit:1
})
// var db  = mysql.createPool({
//   connectionLimit : 10,
//   host            : process.env.DB_HOST,
//   user            : process.env.DB_USER,
//   password        : process.env.DB_PASSWORD,
//   database        : process.env.DB_DATABASE
// });

// db.getConnection(function(err, connection) {
//     // if(err) throw err;
//     // console.log(connection)
//     connection.query( 'SELECT * FROM posts', function(err, rows) {
//       console.log(db._freeConnections.indexOf(connection)); // -1
//       connection.release();
//       console.log(db._freeConnections.indexOf(connection)); // 0
//    });
// });


// db.connect((error)=>{
//     if(error) return console.error("The Error: "+error.message)
//     console.log("connected to my sql server")
// })

module.exports = db