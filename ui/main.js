console.log('Loaded!');


var img = document.getElementById('madi');
var counter = 0;
var marginLeft = 0;

function moveRight(){
    marginLeft += 10;
    img.style.marginLeft = marginLeft + "px";
}

img.onclick = function(){
    var interval = setInterval(moveRight, 100);
};

var button = document.getElementById("counter");
button.onclick = function(){
    // make request to the counter wndPoint
    var request = new XMLHttpRequest();
    
    //capture the response of the variable
    
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        document.getElementById("count").innerHTML = request.responseText;
      }
      else {
        alert('There was a problem with the request.');
      }
    }
    };
    
    //Make a request
    request.open('GET', "http://jin09.imad.hasura-app.io/counter");
    request.send();
};

var names;

var submit = document.getElementById("submit");
submit.onclick = function(){
    
        // make request to the counter wndPoint
    var request = new XMLHttpRequest();
    
    //capture the response of the variable
    
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        names = request.responseText;
        names = JSON.parse(names);
        var list = "";
        for(var i=0;i<names.length;i++){
            var name = names[i];
            list += "<li>"+name+"</li>";
        }
        
        document.getElementById("list").innerHTML = list;
        
      }
      else {
        alert('There was a problem with the request.');
      }
    }
    };
    
    //Make a request
    var url = "http://jin09.imad.hasura-app.io/submit-name/";
    var txt = document.getElementById("name").value;
    url = url + txt;
    request.open('GET', url);
    request.send();
    
};