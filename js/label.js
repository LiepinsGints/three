// JavaScript Document
//insert after three js
function updateLabel(delta){
//--> camera position start	
document.getElementById("CamX").innerHTML=Math.round(camera.position.x);
document.getElementById("CamY").innerHTML=Math.round(camera.position.y);
document.getElementById("CamZ").innerHTML=Math.round(camera.position.z);
document.getElementById("PlaneVertices").innerHTML=plane.geometry.vertices.length;
document.getElementById("CurentSegment").innerHTML=planePos.getSegment(planeW, planeH, planeWs, planeHs,cube.position.x,cube.position.y);
document.getElementById("LeftVertice").innerHTML=planePos.getVertices(planeW, planeH, planeWs, planeHs,cube.position.x,cube.position.y);


}