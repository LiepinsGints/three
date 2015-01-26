// JavaScript Document
//insert after three js
function CameraPlayer(mesh,camera){
	
camera.position.x =mesh.position.x ;
camera.position.y =mesh.position.y ;

this.setPos=function setPos (x,y,z) {	
	camera.position.x =x ;
	camera.position.y =y ;
	camera.position.z =z ;
    return camera;
};


	
}//<-- class end