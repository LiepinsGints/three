// JavaScript Document
function updateLabel(){
//--> camera position start	
document.getElementById("CamX").innerHTML=camera.position.x;
document.getElementById("CamY").innerHTML=camera.position.y;
document.getElementById("CamZ").innerHTML=camera.position.z;
//<-- camera position end
}