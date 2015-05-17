document.addEventListener( 'keydown', keyDown, false );
function keyDown(event){
	switch(event.keyCode){
     case 37 : //left arrow 
	 meshMove.setLeft(1);
    break;
    case 38 : // up arrow  
	 meshMove.setForward(1);
    break;
    case 39 : // right arrow 
     meshMove.setRight(1);
    break;
    case 40 : //down arrow
     meshMove.setBack(1);
    break;
	//rotate cube
	case 45 : //insert
     camera.rotation.x+=-1* Math.PI / 180;
    break; 
	case 46 : //insert
     camera.rotation.x+=1* Math.PI / 180;
    break; 
	case 36 : //insert
     camera.rotation.y+=-1* Math.PI / 180;
    break; 
	case 35 : //insert
     camera.rotation.y+=1* Math.PI / 180;
    break; 
	case 33 : //insert
     camera.rotation.z+=-1* Math.PI / 180;
    break; 
	case 34 : //insert
     camera.rotation.z+=1* Math.PI / 180;
    break; 
	///end rotate
	case 97 : //x axes camera
		//var quaternion = new THREE.Quaternion();
		//quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 8 );
		//camera.setRotationFromQuaternion( quaternion );
		
   		rotateCamera.update(camera,cube.position.x,cube.position.y,cube.position.z,1,60,0,1,0);
		camera.up = new THREE.Vector3(0,0,1);
		camera.lookAt(new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
		
		
		//camera.lookAt(new THREE.Vector3(0,0,0));
    break;
	case 98 : //y axes camera
		
		rotateCamera.update(camera,cube.position.x,cube.position.y,cube.position.z,1,60,1,1,0);
		camera.up = new THREE.Vector3(0,0,1);
		camera.lookAt(new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
    break;
	case 99 : //z axes camera
		
		rotateCamera.update(camera,cube.position.x,cube.position.y,cube.position.z,1,60,2,1,0);
		camera.up = new THREE.Vector3(0,0,1);
		camera.lookAt(new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
    break;
		case 100 : //x axes camera
		
   		rotateCamera.update(camera,cube.position.x,cube.position.y,cube.position.z,1,60,0,-1,0);
		camera.up = new THREE.Vector3(0,0,1);
		camera.lookAt(new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
    break;
	case 101 : //y axes camera
		
		rotateCamera.update(camera,cube.position.x,cube.position.y,cube.position.z,1,60,1,-1,0);
		camera.up = new THREE.Vector3(0,0,1);
		camera.lookAt(new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
    break;
	case 102 : //z axes camera
		
		rotateCamera.update(camera,cube.position.x,cube.position.y,cube.position.z,1,60,2,-1,0);
		camera.up = new THREE.Vector3(0,0,1);
		camera.lookAt(new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
    break;
	case 107 : //inrease terrain
     editPlane(planePos.getVertices(planeW, planeH, planeWs, planeHs,cube.position.x,cube.position.y),1,plane);
    break;
	case 109 : //lower terrain
     editPlane(planePos.getVertices(planeW, planeH, planeWs, planeHs,cube.position.x,cube.position.y), -1,plane);
    break;
	case 110:
    //rotateLight.update(lightPoint,0,0,0,1,40,2,1);
	//spawns.createSphera(5, 32, 32,cube.position.x,cube.position.y,cube.position.z,0xba1a1a,scene);
						
	//rotateLight.pythagor(10,5);
	break;
	}
	
	
}//<-- keyDown end
document.addEventListener( 'keyup', keyUp, false );
function keyUp(event){
	switch(event.keyCode){
     case 37 : //left arrow 
	 meshMove.setLeft(0);
    break;
    case 38 : // up arrow  
	 meshMove.setForward(0);
    break;
    case 39 : // right arrow 
     meshMove.setRight(0);
    break;
    case 40 : //down arrow
     meshMove.setBack(0);
    break;
	}
}//<-- key up end