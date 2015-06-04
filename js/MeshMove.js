// JavaScript Document
function MeshMove(mesh,cam, rotateCamera){
//<--Obejct movement activators -->
//0- not moving
//1 - enabled movement
this.moveForward=0;
this.moveBack=0;
this.moveLeft=0;
this.moveRight=0;
this.moveUp=0;
this.moveDown=0;

//start position
rotateCamera.update(cam,mesh.position.x,mesh.position.y,mesh.position.z,60,60,1,-1,0);
cam.up = new THREE.Vector3(0,0,1);
cam.lookAt(new THREE.Vector3(mesh.position.x,mesh.position.y,mesh.position.z));


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
	var a = new THREE.Vector2(mesh.position.x-cam.position.x, mesh.position.y-cam.position.y );
	a.normalize();
  if(this.moveForward==1){
	//mesh.position.y += this.movementSpeed*delta;
		//First of all we create a matrix and put the rotation of the cube into it
     	//rotObjectMatrix = new THREE.Matrix4();
     	//rotObjectMatrix.makeRotationFromQuaternion(cam.quaternion);
     	//Next we just have to apply a rotation to the quaternion using the created matrix
     	//mesh.quaternion.setFromRotationMatrix(rotObjectMatrix);
		//mesh.rotation.z=cam.rotation.z;
	
	
	mesh.position.x += this.movementSpeed*delta*a.x;
	mesh.position.y += this.movementSpeed*delta*a.y;
	
	cam.position.x += this.movementSpeed*delta*a.x;
	cam.position.y += this.movementSpeed*delta*a.y;
	
    physics.collision(plane,300,300,mesh,6,6,cam); 
   // editor.collisionPlane2(plane,300,300,mesh,6,6,cam);   
	//mesh.translateY( this.movementSpeed*delta );
	//cam.translateY( this.movementSpeed*delta );
	//cam.position.y += this.movementSpeed*delta;
  }
  if(this.moveBack==1){
	//mesh.position.y -= this.movementSpeed*delta;
	//mesh.translateY( this.movementSpeed*delta*(-1) );
	//cam.translateY( this.movementSpeed*delta*(-1) );
	//cam.position.y -= this.movementSpeed*delta;
	mesh.position.x -= this.movementSpeed*delta*a.x;
	mesh.position.y -= this.movementSpeed*delta*a.y;
	
	cam.position.x -= this.movementSpeed*delta*a.x;
	cam.position.y -= this.movementSpeed*delta*a.y;
    //editor.collisionPlane2(plane,300,300,mesh,6,6,cam); 
    physics.collision(plane,300,300,mesh,6,6,cam);  
  }
  if(this.moveLeft==1){
	//mesh.position.x -= this.movementSpeed*delta;
	//mesh.translateX( this.movementSpeed*delta*(-1) );
	//cam.translateX( this.movementSpeed*delta*(-1) );
	//cam.position.x -= this.movementSpeed*delta;
	rotateCamera.update(cam,mesh.position.x,mesh.position.y,mesh.position.z,-1,60,2,0);
	cam.up = new THREE.Vector3(0,0,1);
	cam.lookAt(new THREE.Vector3(mesh.position.x,mesh.position.y,mesh.position.z));
	mesh.rotation.z+=1* Math.PI / 180;
   // editor.collisionPlane2(plane,300,300,mesh,cam);  
  }
  if(this.moveRight==1){
	//mesh.position.x += this.movementSpeed*delta; 
	//mesh.translateX( this.movementSpeed*delta );
	//cam.translateX( this.movementSpeed*delta );
	//cam.position.x += this.movementSpeed*delta;
	rotateCamera.update(cam,mesh.position.x,mesh.position.y,mesh.position.z,1,60,2,0);
	cam.up = new THREE.Vector3(0,0,1);
	cam.lookAt(new THREE.Vector3(mesh.position.x,mesh.position.y,mesh.position.z));
	mesh.rotation.z+=-1* Math.PI / 180;
    //editor.collisionPlane2(plane,300,300,mesh,cam);  
  }
   if(this.moveUp==1){
	//mesh.position.z += this.movementSpeed*delta;
	mesh.translateZ( this.movementSpeed*delta );
	cam.translateZ( this.movementSpeed*delta );
	//cam.position.z += this.movementSpeed*delta;
  }
  if(this.moveDown==1){
	//mesh.position.z -= this.movementSpeed*delta; 
	mesh.translateZ( this.movementSpeed*delta*(-1) );
	cam.translateZ( this.movementSpeed*delta*(-1) );
	//cam.position.z -= this.movementSpeed*delta;
  }
   return mesh;
}//<--
	
}//<-- mesh move end