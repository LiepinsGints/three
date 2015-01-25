// Key inputs

function onDocumentKeyDown(event){
var keycode = event.keyCode;
switch(keycode){
case 37 : //left arrow 

break;
case 38 : // up arrow  

break;
case 39 : // right arrow 

break;
case 40 : //down arrow

break;
//<-- camera move numlock
case 100 : //left arrow 
camera.position.x -=10 ;
break;
case 109 : // up arrow  
camera.position.z -=10;
break;
case 102 : // right arrow 
camera.position.x += 10;
break;
case 107: //down arrow
camera.position.z += 10;
break;
case 98: //down arrow
camera.position.y -= 10;
break;
case 104: //down arrow
camera.position.y += 10;
break;

}
}