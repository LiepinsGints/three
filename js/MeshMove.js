// JavaScript Document
function MeshMove(mesh){
//<--Obejct movement activators -->
//0- not moving
//1 - enabled movement
this.moveForward=0;
this.moveBack=0;
this.moveLeft=0;
this.moveRight=0;
this.moveUp=0;
this.moveDown=0;

this.movementSpeed=10;
/*Activate deactivate movement*/
this.setForward=function setForward (int) {
	if(int!=0 && int !=1)
	this.moveForward=0;
	else
	this.moveForward=int;
}
this.setBack=function setBack (int) {
	if(int!=0 && int !=1)
	this.moveBack=0;
	else
	this.moveBack=int;
}
this.setLeft=function setLeft (int) {
	if(int!=0 && int !=1)
	this.moveLeft=0;
	else
	this.moveLeft=int;
}
this.setRight=function setRight (int) {
	if(int!=0 && int !=1)
	this.moveRight=0;
	else
	this.moveRight=int;
}
this.setUp=function setUp (int) {
	if(int!=0 && int !=1)
	this.moveUp=0;
	else
	this.moveUp=int;
}
this.setDown=function setDown (int) {
	if(int!=0 && int !=1)
	this.moveDown=0;
	else
	this.moveDown=int;
}
this.setSpeed=function setSpeed (int) {
	if(int<=0){
	this.movementSpeed=0;
	this.moveForward=0;
    this.moveBack=0;
    this.moveLeft=0;
    this.moveRight=0;
    this.moveUp=0;
    this.moveDown=0;
	}
	else
	this.movementSpeed=int;
}
/*Update mesh movement */
this.update=function update (delta) {
  if(this.moveForward==1){
	mesh.position.y += this.movementSpeed*delta;
  }
  if(this.moveBack==1){
	mesh.position.y -= this.movementSpeed*delta;
  }
  if(this.moveLeft==1){
	mesh.position.x -= this.movementSpeed*delta;
  }
  if(this.moveRight==1){
	mesh.position.x += this.movementSpeed*delta; 
  }
   if(this.moveUp==1){
	mesh.position.z += this.movementSpeed*delta;
  }
  if(this.moveDown==1){
	mesh.position.z -= this.movementSpeed*delta; 
  }
   return mesh;
}//<--
	
}//<-- mesh move end