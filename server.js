var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    "article-one" : {
    title: "Article One | JIN09",
    heading : "Article One",
    date : "12 OCT 2016",
    content : `<div>
                <p>
                     This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! 
                </p>
            </div>
            
            <div>
                <p>
                     This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! 
                </p>
            </div>
            
            <div>
                <p>
                     This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! 
                </p>
            </div>`
},
    "article-two" : {
    title: "Article Two | JIN09",
    heading : "Article Two",
    date : "12 OCT 2016",
    content : `<div>
                <p>
                     This is my second article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! 
                </p>
            </div>
            
            <div>
                <p>
                     This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! 
                </p>
            </div>
            
            <div>
                <p>
                     This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! 
                </p>
            </div>`
    },
    "article-three" : {
        title: "Article Three | JIN09",
    heading : "Article Three",
    date : "12 OCT 2016",
    content : `<div>
                <p>
                     This is my Three article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! 
                </p>
            </div>
            
            <div>
                <p>
                     This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! 
                </p>
            </div>
            
            <div>
                <p>
                     This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! This is my first article!! 
                </p>
            </div>`
    }
};

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
        <input type="text" id="name">
        <input type="submit" id="submit" value="submit">
        <hr/>
        <h2>COMMENTS : </h2>
        <ul id="list">
            </ul>
        
        <script type="text/javascript" src="/ui/main.js">
        </scrpit>
    </body>
    </html> `;
    return htmlTemplate;
}


var counter = 0;

app.get('/counter', function (req, res) {
    counter++;
  res.send(counter.toString());
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

app.get('/:article_name', function (req, res) {
  // using the colon (:) will convert the requested string to a parameter
  var article_name = req.params.article_name;
  res.send(createTemplate(articles[article_name]));
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
