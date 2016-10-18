console.log('Loaded!');
var txt = document.getElementById("txt");
txt.innerHTML = "TEXT HACKED!!!";

var img = document.getElementById('madi');

var marginLeft = 0;

function moveRight(){
    marginLeft += 10;
    img.style.marginLeft = marginLeft + "px";
}

img.onclick = function(){
    var interval = setInterval(moveRight, 100);
};