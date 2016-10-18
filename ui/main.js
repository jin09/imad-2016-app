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
        alert();
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