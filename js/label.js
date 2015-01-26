// JavaScript Document
//insert after three js
function updateLabel(delta){
//--> camera position start	
document.getElementById("CamX").innerHTML=Math.round(camera.position.x);
document.getElementById("CamY").innerHTML=Math.round(camera.position.y);
document.getElementById("CamZ").innerHTML=Math.round(camera.position.z);



}