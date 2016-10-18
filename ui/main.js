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
button.onClick = function(){
    // make request to the counter wndPoint
    
    //capture the response of the variable
    
    //Render the variable to the correct span
    counter++;
    getElementById("count").innerHTML = counter.toString();
    
};