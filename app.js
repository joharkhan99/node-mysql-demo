const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
//take all contents from public folder and make them availabale
app.use(express.static(__dirname + "/public"));


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'join_us'
});
// connection.connect();

app.get('/', function (req, res) {
  // find count of users in DB
  connection.query("SELECT COUNT(*) as total FROM users", function (error, results, fields) {
    if (error) throw error;

    var count = results[0].total;
    // then respond that count
    //render/display html file and pass data var to this file
    res.render('home', { data: count });
  });
});

app.post('/register', function (req, res) {
  var person = { email: req.body.email };

  connection.query("INSERT INTO users SET ?", person, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/');      //redirect to homepage
  });
});

// connection.end();

// server start
app.listen(8080, () => {
  console.log("Listening started on 8080");
});


