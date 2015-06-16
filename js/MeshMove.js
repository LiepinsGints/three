// JavaScript Document
function MeshMove(mesh,cam, rotateCamera,_height,_width){
//<--Obejct movement activators -->
//0- not moving
this.height=_height;
this.width=_width;    
//1 - enabled movement
this.moveForward=0;
this.moveBack=0;
this.moveLeft=0;
this.moveRight=0;
this.moveUp=0;
this.moveDown=0;
this.moveJump=0;    
//Preventing controls while falling
this.controllsLocked=0;//1-locked 0 - unlocked
this.movementType=0;//1- forward 2back 3-down 4 jump
this.velocity=0;
this.velocityLose=0.0;    
//start position
rotateCamera.update(cam,mesh.position.x,mesh.position.y,mesh.position.z,60,60,1,-1,0);
cam.up = new THREE.Vector3(0,0,1);
cam.lookAt(new THREE.Vector3(mesh.position.x,mesh.position.y,mesh.position.z));


this.movementSpeed=10;
    
this.getControllsLocked=function getControllsLocked () {
	return this.controllsLocked;
} 

this.getMovementType=function getMovementType () {
	return this.movementType;
}  
this.getVelocity=function getVelocity () {
	return this.velocity;
}   

this.setControllsLocked=function getControllsLocked (int) {
    this.controllsLocked=int;
} 

this.movementType=function movementType (int) {
	this.movementType=int;
}  
this.setVelocity=function setVelocity (int) {
	return this.velocity= int;
} 
/*Activate deactivate movement*/
this.setJump=function setForward (int, _velocity) {
	if(int!=0 && int !=1)
	this.moveJump=0;
	else{
	this.moveJump=int;
    this.velocity=_velocity; 
    this.velocityLose=_velocity/10;    
    }
}
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

this.teleport=function teleport(x,y,z) {
    heightDiference=cam.position.z-mesh.position.z;
    xDiference=cam.position.x-mesh.position.x;
    yDifference= cam.position.y-mesh.position.y;   
    //move mesh with vector
    var a = new THREE.Vector2(x-mesh.position.x, y-mesh.position.y );
    distance = pythagor(x-mesh.position.x, y-mesh.position.y,0);
	a.normalize();
    mesh.position.x += distance*a.x;
	mesh.position.y += distance*a.y;
    //alert("go to teleport block distance: "+distance+"\n");
    //move cam with vector
    a = new THREE.Vector2(x-cam.position.x, y-cam.position.y );
    distance = pythagor(x-cam.position.x, y-cam.position.y,0);
    a.normalize();
    cam.position.x = xDiference+mesh.position.x;
	cam.position.y = yDifference+mesh.position.y;
    //calculate new height
     cam.position.z= z+heightDiference;   
     mesh.position.z=z; 
    physics.collision(plane,planeWs,planeHs,mesh,6,6,cam,delta,1); 
    this.moveForward=0;
this.moveBack=0;
this.moveLeft=0;
this.moveRight=0;
this.moveUp=0;
this.moveDown=0;
this.moveJump=0;    
//Preventing controls while falling
this.controllsLocked=0;//1-locked 0 - unlocked
this.movementType=0;
   
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
	
    movement_status=physics.collision(plane,planeWs,planeHs,mesh,6,6,cam,delta); 
    if(movement_status==1){
        mesh.position.x -= this.movementSpeed*delta*a.x;
	    mesh.position.y -= this.movementSpeed*delta*a.y;
	
	    cam.position.x -= this.movementSpeed*delta*a.x;
	    cam.position.y -= this.movementSpeed*delta*a.y;
        if( this.controllsLocked==1){this.movementType=2;this.moveForward=0;this.moveBack=1;}
    } else if(movement_status==2){
        this.controllsLocked=1;//1-locked 0 - unlocked
        this.movementType=1;//1- forward 2back   
    }else if(movement_status==0 && this.controllsLocked==1){
        this.controllsLocked=0;//1-locked 0 - unlocked
        this.movementType=0;//1- forward 2back 
        this.moveForward=0;
        this.moveBack=0;
       
    }
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
     movement_status=physics.collision(plane,planeWs,planeHs,mesh,6,6,cam,delta); 
    if(movement_status==1){
        mesh.position.x += this.movementSpeed*delta*a.x;
	    mesh.position.y += this.movementSpeed*delta*a.y;
	
	    cam.position.x += this.movementSpeed*delta*a.x;
	    cam.position.y += this.movementSpeed*delta*a.y;
        if( this.controllsLocked==1){this.movementType=1;this.moveForward=1;this.moveBack=0;}
    }else if(movement_status==2){
        this.controllsLocked=1;//1-locked 0 - unlocked
        this.movementType=2;//1- forward 2back   
    }else if(movement_status==0 && this.controllsLocked==1){
        
        this.controllsLocked=0;//1-locked 0 - unlocked
        this.movementType=0;//1- forward 2back   
        this.moveBack=0;
        this.moveForward=0;
    }
  }
  if(this.moveLeft==1){
	//mesh.position.x -= this.movementSpeed*delta;
	//mesh.translateX( this.movementSpeed*delta*(-1) );
	//cam.translateX( this.movementSpeed*delta*(-1) );
	//cam.position.x -= this.movementSpeed*delta;
	rotateCamera.update(cam,mesh.position.x,mesh.position.y,mesh.position.z,1,60,2,0);
	cam.up = new THREE.Vector3(0,0,1);
	cam.lookAt(new THREE.Vector3(mesh.position.x,mesh.position.y,mesh.position.z));
	mesh.rotation.z+=1* Math.PI / 180;
      
      
   // editor.collisionPlane2(plane,300,300,mesh,cam);  
  }
    //
  if(this.moveRight==1){
	//mesh.position.x += this.movementSpeed*delta; 
	//mesh.translateX( this.movementSpeed*delta );
	//cam.translateX( this.movementSpeed*delta );
	//cam.position.x += this.movementSpeed*delta;
	rotateCamera.update(cam,mesh.position.x,mesh.position.y,mesh.position.z,-1,60,2,0);
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
  if(this.moveJump==1){
	var a = new THREE.Vector2(mesh.position.x-cam.position.x, mesh.position.y-cam.position.y );
	a.normalize();
      
    this.controllsLocked=1;//1-locked 0 - unlocked
    this.movementType=4;//1- forward 2back   
    mesh2 = mesh.clone();
    cam2 =cam.clone();  
    mesh2.position.x += this.movementSpeed*delta*a.x;
	mesh2.position.y += this.movementSpeed*delta*a.y;
	mesh2.position.z += (this.velocity-this.velocityLose*delta*20);
    //scene.add(mesh2);    
	cam2.position.x += this.movementSpeed*delta*a.x;
	cam2.position.y += this.movementSpeed*delta*a.y;
    cam2.position.z += (this.velocity-this.velocityLose*delta*20);
    
     // alert(this.velocity);
   
    
    
    movement_status=physics.collision(plane,planeWs,planeHs,mesh2,6,6,cam2,delta,2); 
    // output.value+="movement:"+movement_status+"\n";
        if(movement_status==3){
        
            if( this.controllsLocked==1){this.movementType=1;this.moveForward=1;this.moveBack=0;}     
        
        
        
       // this.controllsLocked=0;//1-locked 0 - unlocked
        //this.movementType=0;//1- forward 2back   
        //this.moveBack=0;
        //this.moveForward=0;
        this.moveJump=0;
    }else if (movement_status!=3){
      mesh.position.set(mesh2.position.x, mesh2.position.y, mesh2.position.z);  
      cam.position.set(cam2.position.x, cam2.position.y, cam2.position.z);    
    }
     this.velocity-=this.velocityLose*delta*20;    
      
      
  }
   
   return mesh;
}//<--
	
}//<-- mesh move end