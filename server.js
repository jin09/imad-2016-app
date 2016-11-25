var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require("pg").Pool;
var crypto = require("crypto");
var bodyParser = require("body-parser");
var config = {
  host: 'db.imad.hasura-app.io',
  user: 'jin09',
  password: 'db-jin09-76314',
  database: 'jin09',
  port: '5432'
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = 
    `
    <html>
    <head>
        <title>
            ${title}
        </title>    
        <meta name="viewport" content="width=device-width ,initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
        
    </head>
    
    <body>
        <div class="container">
            <div>
                <a href ="/">Home</a>
            </div>
            <hr>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>         
            ${content}
        </div>
        <hr/>
        ADD A COMMENT 
        <input type="text" id="comment_text">
        <input type="submit" id="comment_submit" value="submit">
        <hr/>
        <h2>COMMENTS : </h2>
        <ul id="comment_list">
            </ul>
        <script type="text/javascript" src="/ui/main.js">
        </script>
    </body>
    </html> `;
    return htmlTemplate;
}

var pool = new Pool(config);
app.get('/testdb', function (req, res) {
    pool.query("select * from test", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter = 0;

app.get('/counter', function (req, res) {
    counter++;
  res.send(counter.toString());
});

function hash(input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get("/hash/:input", function(req, res){
    var hashString = hash(req.params.input, "this-is-a-random-salt");
    res.send(hashString);
});

app.post("/createuser", function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query("insert into 'user'(username, password) values($1,$2)",[username, dbString], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send("User successfully created: " + username);
        }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names=[];

app.get('/submit-name/:name', function (req, res) {
    
    var name = req.params.name;
    names.push(name);
    
  res.send(JSON.stringify(names));
});

var comments = [];
app.get('/submit-comment/:comment', function (req, res) {
    
    var comment = req.params.comment;
    comments.push(comment);
  res.send(JSON.stringify(comments));
});

app.get('/articles/:article_name', function (req, res) {
  // using the colon (:) will convert the requested string to a parameter
  var articleData;
  pool.query("select * from article where title = '"+ req.params.article_name + "'", function(err, result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length === 0){
              res.status(404).send("Article not found");
          }
          else{
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
  });
  
});
/*
app.get('/:article-two', function (req, res) {
  res.send(createTemplate(articles.article_two));
});

app.get('/:article-three', function (req, res) {
  res.send(createTemplate(articles.article_three));
});
*/


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
