<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Index</title>
<link rel="stylesheet" href="css/layout.css" />

<!--<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>-->
<script type="text/javascript" src="js/three.js"></script>
<script type="text/javascript" src="js/Math.js"></script>
<script type="text/javascript" src="js/label.js"></script>
<script type="text/javascript" src="js/MeshMove.js"></script>
<script type="text/javascript" src="js/planePos.js"></script>
<script type="text/javascript" src="js/RotateArroundPoint.js"></script>
<script type="text/javascript" src="js/ConsoleCommands.js"></script>
<script type="text/javascript" src="js/Controls.js"></script>
<script type="text/javascript" src="js/ObjectSpawns.js"></script>
<script type="text/javascript" src="js/Editor.js"></script>
<script type="text/javascript" src="js/Physics.js"></script>
<script type="text/javascript" src="js/Planets.js"></script> 
    
    


<script id="vertexShader" type="x-shader/x-vertex">
       varying vec4 col;
       //uniform vec4 colorC;
       //uv texture in three.js
       uniform sampler2D grass1;
       uniform sampler2D sand1;
       uniform sampler2D stone4;
       uniform sampler2D ice1;
       uniform vec4 colorC;
       varying vec3 my_pos;//position
       varying vec2 my_uv;//texture for passing to fragment shader must declare same name...
       void main() {
           
            my_pos=position;
            my_uv =uv;
            
            if(my_pos.z <=2.0){
                col =  texture2D(sand1,my_uv);
                //col =  vec4(0.0, 0.2, 0.4, 1.0);
            }else if(my_pos.z>2.0 && my_pos.z<=6.0) {
             //col = colorC;
             col =  texture2D(grass1,my_uv);
            }
            else if(my_pos.z>6.0 && my_pos.z<=12.0){
                col =  texture2D(stone4,my_uv);
                //col = colorC;
            }else{
                 col =  texture2D(ice1,my_uv);
            }
           // col= vec4(0.0, 0.2, 0.4, 1.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
           
        }
</script>

<script id="fragmentShader" type="x-shader/x-fragment">
     varying vec4 col;
    precision mediump float;
    varying vec3 my_pos;
    
    
    varying vec2 my_uv;
    
       void main(void) {
               
           /* if(my_pos.z <=2.0){
             gl_FragColor = colorC;
            }else if(my_pos.z>2.0 && my_pos.z<=6.0) {
              gl_FragColor =  texture2D(grass1,my_uv);
            }
            else{
              gl_FragColor =  vec4(0.0, 0.2, 0.4, 1.0);
            }*/
             gl_FragColor=col;
        }
</script>

<script type="text/javascript" src="js/Plane.js"></script>
<!-- some tutorial https://stemkoski.github.io/Three.js/#mesh-movement-->
<!--free models https://clara.io/view/19a8b999-4807-4252-be15-043b1f6e265c-->
<!-- free models http://www.md2.sitters-electronics.nl/models.html-->    
</head>
<body>
<?php
include_once 'blocks/ui.php';
?>
<script>
//http://www.nutty.ca/webgl/skygen/
//--> base variables start 
var clock = new THREE.Clock();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 500 );
camera.position.z=50;
var spawns = new ObjectSpawns();
physics= new Physics('outputConsole');    
//<-- base variables end			
//--> renderer definition start
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//<-- renderer definition end
/******************** OBJECT DEFINITIONS START  *********************/ 
   
//--> create cube start
var textureCube = THREE.ImageUtils.loadTexture( "img/textures/BoxTextures/crate_1.jpg" );
var geometry = new THREE.BoxGeometry( 6, 6, 6 );
var material = new THREE.MeshLambertMaterial( { map : textureCube }  );
var cube = new THREE.Mesh( geometry, material );
cube.position.z=3;
cube.position.x=-50;
cube.position.y=100;
scene.add( cube );
var rotateCamera= new  RotateArroundPoint(camera,cube.position.x,cube.position.y,cube.position.z,1,60,2,1);
rotateCamera.update(camera,cube.position.x,cube.position.y,cube.position.z,-40,60,0,1)
cube.rotation.z=getRadians(40);
//<-- create cube end
//player holder
//player=cube;     
//---> create sphera
var spheraGeo = new THREE.SphereGeometry( 5, 32, 32 );
var spheraMat= new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphera = new THREE.Mesh( spheraGeo, spheraMat );
sphera.position.z=15;
//scene.add( sphera );


var spheraGeo1 = new THREE.SphereGeometry( 5, 32, 32 );
var spheraMat1= new THREE.MeshBasicMaterial( {color: 0xba1a1a} );
var sphera1 = new THREE.Mesh( spheraGeo1, spheraMat1 );
sphera1.position.z=15;
sphera1.position.x=30;
//scene.add( sphera1 );
var objects=[];
objects.push(sphera);
objects.push(sphera1);
//scene.add( objects[0] );
//scene.add( objects[1] );
//<-- sphera end
/*****************Planets*******************************/

planets = new Planets();
sun=planets.addSun();
sun.position.z=80;
scene.add(sun);

earth=planets.addEarth();
earth.position.x=10;
earth.position.z=105;
scene.add(earth);
rotateEarth= new  RotateArroundPoint(earth,sun.position.x,sun.position.y,sun.position.z,1,150,2,1);

moon=planets.addMoon();
moon.position.z=10;
scene.add(moon); 
rotateMoon= new  RotateArroundPoint(moon,earth.position.x,earth.position.y,earth.position.z,1,30,2,1);

mercury=planets.createPlanet ('img/Planets/Mercury/mercurymap.jpg','img/Planets/Mercury/mercurybump.jpg',0.1,5,32, 32);
mercury.position.z=105;

scene.add(mercury);
rotateMercury= new  RotateArroundPoint(mercury,sun.position.x,sun.position.y,sun.position.z,1,58,2,1);

venus=planets.createPlanet ('img/Planets/Venus/venusmap.jpg','img/Planets/Venus/venusbump.jpg',0.1,12,32, 32);
venus.position.z=105;
venus.position.y=50;
scene.add(venus);
rotateVenus= new  RotateArroundPoint(venus,sun.position.x,sun.position.y,sun.position.z,1,108,2,1);

mars=planets.createPlanet ('img/Planets/Mars/mars_1k_color.jpg','img/Planets/Mars/mars_1k_topo.jpg',0.5,12,32, 32);
mars.position.z=20;
mars.position.y=50;
scene.add(mars);
rotateMars= new  RotateArroundPoint(mars,sun.position.x,sun.position.y,sun.position.z,1,227,2,1);

jupiter=planets.createPlanet ('img/Planets/Jupiter/jupitermap.jpg','img/Planets/Jupiter/jupitermap.jpg',0.5,40,32, 32);
jupiter.position.z=105;
jupiter.position.y=50;
scene.add(jupiter);
rotateJupiter= new  RotateArroundPoint(jupiter,sun.position.x,sun.position.y,sun.position.z,1,350,2,1);


saturn=planets.createPlanet ('img/Planets/Saturn/saturnmap.jpg','img/Planets/Saturn/saturnmap.jpg',0.5,35,32, 32);
saturn.position.z=105;
saturn.position.y=50;
scene.add(saturn);
rotateSaturn= new  RotateArroundPoint(saturn,sun.position.x,sun.position.y,sun.position.z,1,425,2,1);

uranus=planets.createPlanet ('img/Planets/Uranus/uranusmap.jpg','img/Planets/Uranus/uranusmap.jpg',0.5,20,32, 32);
uranus.position.z=105;
uranus.position.y=50;
scene.add(uranus);
rotateUranus= new  RotateArroundPoint(uranus,sun.position.x,sun.position.y,sun.position.z,1,500,2,1);

pluto=planets.createPlanet ('img/Planets/Pluto/plutomap1k.jpg','img/Planets/Pluto/plutobump1k.jpg',0.5,4,32, 32);
pluto.position.z=105;
pluto.position.y=50;
scene.add(pluto);
rotatePluto= new  RotateArroundPoint(pluto,sun.position.x,sun.position.y,sun.position.z,1,550,2,1);

    
//rings test
torusGeometry    = new THREE.TorusGeometry( 40, 0.1 , 50 ,50); 
torusMaterial    = new THREE.MeshPhongMaterial(); 
torusMesh    = new THREE.Mesh( torusGeometry, torusMaterial );  
torusMaterial.map    = THREE.ImageUtils.loadTexture('img/Planets/Saturn/saturnringcolorthumb.jpg');
torusMesh.rotation.x=getRadians(90);    
saturn.add(torusMesh);
torusGeometry    = new THREE.TorusGeometry( 41, 0.1 , 50 ,50); 
torusMaterial    = new THREE.MeshPhongMaterial(); 
torusMesh    = new THREE.Mesh( torusGeometry, torusMaterial );  
torusMaterial.map    = THREE.ImageUtils.loadTexture('img/Planets/Saturn/saturnringcolorthumb.jpg');
torusMesh.rotation.x=getRadians(90);    
saturn.add(torusMesh);
torusGeometry    = new THREE.TorusGeometry( 42, 0.1 , 50 ,50); 
torusMaterial    = new THREE.MeshPhongMaterial(); 
torusMesh    = new THREE.Mesh( torusGeometry, torusMaterial );  
torusMaterial.map    = THREE.ImageUtils.loadTexture('img/Planets/Saturn/saturnringcolorthumb.jpg');
torusMesh.rotation.x=getRadians(90);    
saturn.add(torusMesh);    
torusGeometry    = new THREE.TorusGeometry( 43, 0.1 , 50 ,50); 
torusMaterial    = new THREE.MeshPhongMaterial(); 
torusMesh    = new THREE.Mesh( torusGeometry, torusMaterial );  
torusMaterial.map    = THREE.ImageUtils.loadTexture('img/Planets/Saturn/saturnringcolorthumb.jpg');
torusMesh.rotation.x=getRadians(90);    
saturn.add(torusMesh);
torusGeometry    = new THREE.TorusGeometry( 44, 0.1 , 50 ,50); 
torusMaterial    = new THREE.MeshPhongMaterial(); 
torusMesh    = new THREE.Mesh( torusGeometry, torusMaterial );  
torusMaterial.map    = THREE.ImageUtils.loadTexture('img/Planets/Saturn/saturnringcolorthumb.jpg');
torusMesh.rotation.x=getRadians(90);    
saturn.add(torusMesh);
torusGeometry    = new THREE.TorusGeometry( 45, 0.1 , 50 ,50); 
torusMaterial    = new THREE.MeshPhongMaterial(); 
torusMesh    = new THREE.Mesh( torusGeometry, torusMaterial );  
torusMaterial.map    = THREE.ImageUtils.loadTexture('img/Planets/Saturn/saturnringcolorthumb.jpg');
torusMesh.rotation.x=getRadians(90);    
saturn.add(torusMesh);   
    
torusGeometry    = new THREE.TorusGeometry( 46, 0.1 , 50 ,50); 
torusMaterial    = new THREE.MeshPhongMaterial(); 
torusMesh    = new THREE.Mesh( torusGeometry, torusMaterial );  
torusMaterial.map    = THREE.ImageUtils.loadTexture('img/Planets/Saturn/saturnringcolorthumb.jpg');
torusMesh.rotation.x=getRadians(90);    
saturn.add(torusMesh);
torusGeometry    = new THREE.TorusGeometry( 47, 0.1 , 50 ,50); 
torusMaterial    = new THREE.MeshPhongMaterial(); 
torusMesh    = new THREE.Mesh( torusGeometry, torusMaterial );  
torusMaterial.map    = THREE.ImageUtils.loadTexture('img/Planets/Saturn/saturnringcolorthumb.jpg');
torusMesh.rotation.x=getRadians(90);    
saturn.add(torusMesh);
torusGeometry    = new THREE.TorusGeometry( 48, 0.1 , 50 ,50); 
torusMaterial    = new THREE.MeshPhongMaterial(); 
torusMesh    = new THREE.Mesh( torusGeometry, torusMaterial );  
torusMaterial.map    = THREE.ImageUtils.loadTexture('img/Planets/Saturn/saturnringcolorthumb.jpg');
torusMesh.rotation.x=getRadians(90);    
saturn.add(torusMesh);      
//torusMesh.position.z=10;    

    
rotatePlanets= new  RotateArroundPoint(earth,sun.position.x,sun.position.y,sun.position.z,1,150,2,0);

                                                                                           

//--> create light start
var lightPoint = new THREE.PointLight( 0xFFFFFF, 2, 15 );
lightPoint.position.set( cube.position.x-50, cube.position.y+20, cube.position.z+5 );
scene.add( lightPoint );
var rotateLight= new  RotateArroundPoint(lightPoint,cube.position.x,cube.position.y,cube.position.z,1,40,2,1);

var lightPoint2 = new THREE.PointLight( 0xFFFFFF, 2, 700 );
lightPoint2.position.set( 0, 0, 500 );
scene.add( lightPoint2 );
//lightPoint.position.z = 100;

var lightAmbient = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( lightAmbient );
//<-- create light end
scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.0019 );
// SKYBOX/FOG
	//var skyBoxGeometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
    var skyBoxGeometry  = new THREE.SphereGeometry(500, 128, 128);   
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff,depthWrite: false, side: THREE.BackSide } );
    skyBoxMaterial.map    = THREE.ImageUtils.loadTexture('img/SkyDome/Sky-111604-A.jpg');
	skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    skyBox.frustumCulled=false; 
    //scene.add(skyBox);
	//scene.add(skyBox);
/*skyBoxGeo = new THREE.SphereGeometry(1000, 128, 128);
skyBoxMat = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
skyBox = new THREE.Mesh( skyBoxGeo, skyBoxMat );

*/
//scene.add(skyBox);
camera.add(skyBox );
scene.add( camera );
//scene.add(skyBox);
//-->create plane start
//texture 1

scene.add( plane );

//<--create plane end
//--> camera settings start
//camera.rotation.x = 45 * Math.PI / 180;
//<-- camera settings end
/******************** OBJECT DEFINITIONS END ********************/

/******************** PLAYER FUNCTIONS START ********************/


//var camPlayer= new CameraPlayer(cube,camera);
var delta;
var meshMove = new  MeshMove(cube,camera,rotateCamera,6,6);
meshMove.setSpeed(30);//30
var planePos = new PlanePos();//<-- for nearest vertice and segment calculation
var temp=planePos.getSegment(planeW, planeH, planeWs, planeHs,cube.position.x,cube.position.y);
//window.alert("temp"+temp);
//document.getElementById("CurentSegment").innerHTML=temp;

//--> camera movement script start
document.addEventListener( 'mousemove', mouseMove, false );
document.addEventListener( 'mousedown', mouseDown, false );
document.addEventListener( 'mouseup', mouseUp, false );
var cameraMoveX=0;
var cameraMoveY=0;
var cameraMoveZ=0;
var x;
var y;
//window.innerWidth/window.innerHeight
function mouseMove(event){
x = event.clientX;
y = event.clientY;
document.getElementById("MousePos").innerHTML="x: "+x +"y: "+y;
	//camera.rotation.y = 45 * Math.PI / 180;
}//<--
function mouseDown(event){
//cameraMoveX=1;
	//meshMove.setForward(1);
}
function mouseUp(event){
//cameraMoveX=0;
}



function update(delta){
updateLabel(delta);
meshMove.update(delta);

//<-- camera movement
if(cameraMoveX==1){
	if(x<window.innerWidth/2){
      //cube.rotation.z += 100*delta * Math.PI / 180;
      
      // RotateArroundPoint(camera.position.x,camera.position.y,cube.position.x,cube.position.y,5);	
	}
	else{
		
	//cube.rotation.z -= 100*delta * Math.PI / 180;
	
	}

}
}//<--update function end
/******************** PLAYER FUNCTIONS END ********************/

/*************************************************************/
//Editor environment
var wire = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
var spheraEditor = new THREE.SphereGeometry( 5, 32, 32 );
spheraEditorMesh = new THREE.Mesh(spheraEditor, wire);
var editor = new Editor(spheraEditorMesh,scene,'editorSize','outputConsole','editorEnable');
/***********************************/
//--->collisions test
var output=document.getElementById('outputConsole');


var collidableMeshList = [];
var arrowList = [];
var directionList = [];

	var wallGeometry = new THREE.BoxGeometry( 10, 10, 20, 1, 1, 1 );
    var textureWall = THREE.ImageUtils.loadTexture( "img/textures/Stone/Stone3.jpg" );   
    var wallMaterial = new THREE.MeshLambertMaterial( { map : textureWall }  );
	
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe:true } );
	
	var wall = new THREE.Mesh(wallGeometry, wallMaterial);
	wall.position.set(100, 50, 10);
    wall.geometry.computeBoundingBox();
	scene.add(wall);
	collidableMeshList.push(wall);

	
	var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall2.geometry.computeBoundingBox();
	wall2.position.set(-150, 50, 5);
	//wall2.rotation.y = 3.14159 / 2;
	scene.add(wall2);
	collidableMeshList.push(wall2);

    var wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall3.geometry.computeBoundingBox();
	wall3.position.set(0, 0, 5);
	//wall2.rotation.y = 3.14159 / 2;
	scene.add(wall3);
	collidableMeshList.push(wall3);
   // collidableMeshList.push(plane);
// collision detection:
	//   determines if any of the rays from the cube's origin to each vertex
	//		intersects any face of a mesh in the array of target meshes
	//   for increased collision accuracy, add more vertices to the cube;
	//		for example, new THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
	//   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
function collide()
{
    var originPoint = cube.position.clone();
	var a = new THREE.Vector2(cube.position.x-camera.position.x, cube.position.y-camera.position.y );
	a.normalize();
	
	
	for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++)
	{		
		var localVertex = cube.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( cube.matrix );
		var directionVector = globalVertex.sub( cube.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		
		
		/*for ( var intersect in collisionResults ) {

		intersect.object.material.color = new THREE.Color( 0xff0000 );
	
		}*/
		
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
			 //collisionResults[0].object.material.color = new THREE.Color( 0xff0000 );
			 	collisionResults[0].object.position.x += 1*a.x;
				collisionResults[0].object.position.y += 1*a.y;
               physics.collision(plane,planeWs,planeHs,collisionResults[0].object,10,20,-1,delta);  
			 output.value+="Hit \n"
			}
	}	
}
//<-- colissions end
//--> renderer function start
var render = function () {
requestAnimationFrame( render );
renderer.render(scene, camera);
//update label
delta = clock.getDelta();
update(delta);
//rotations    

//mesh gravity    
if(meshMove.getControllsLocked()==1){        
	if(meshMove.getMovementType()==1) 
    meshMove.setForward(1);
    else if(meshMove.getMovementType()==2)
    meshMove.setBack(1);    
}
//light point rot    
rotateLight.update(lightPoint,cube.position.x,cube.position.y,cube.position.z,90*delta,50,2,1);
//EARTH + MOON   
rotateEarth.update(earth,sun.position.x,sun.position.y,sun.position.z,4*delta,150,2,1);    
earth.rotation.y+=getRadians(-10*delta);    
rotateMoon.update(moon,earth.position.x,earth.position.y,earth.position.z,10*delta,30,2,1);
               
rotateMercury.update(mercury,sun.position.x,sun.position.y,sun.position.z,3*delta,58,2,1);
mercury.rotation.y+=getRadians(-6*delta);      
//venus
rotateVenus.update(venus,sun.position.x,sun.position.y,sun.position.z,5*delta,108,2,0);
venus.rotation.y+=getRadians(+8*delta);     
//Mars
rotateMars.update(mars,sun.position.x,sun.position.y,sun.position.z,4.5*delta,227,2,1);    
mars.rotation.y+=getRadians(-8*delta);    

rotateJupiter.update(jupiter,sun.position.x,sun.position.y,sun.position.z,3.5*delta,350,2,1);
jupiter.rotation.y+=getRadians(-8*delta);       
    
rotateSaturn.update(saturn,sun.position.x,sun.position.y,sun.position.z,2.5*delta,425,2,1);
saturn.rotation.y+=getRadians(-7*delta);  

rotateUranus.update(uranus,sun.position.x,sun.position.y,sun.position.z,1*delta,500,2,1);
uranus.rotation.y+=getRadians(-7*delta);      
   
rotatePluto.update(pluto,sun.position.x,sun.position.y,sun.position.z,1.5*delta,550,2,1);
pluto.rotation.y+=getRadians(-4*delta);  
    
collide();

skyBox.rotation.x+=getRadians(1*delta);
editor.follow(cube.position.x, cube.position.y, cube.position.z-6/2);   
   
//cameraFollow


};
//<-- renderer function end
//--> function init start
render();
//<-- function init end
</script>


</body>
</html>
