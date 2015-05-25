<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Index</title>
<link rel="stylesheet" href="css/layout.css" />

<!--<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>-->
<script type="text/javascript" src="js/three.js"></script>
<script type="text/javascript" src="js/label.js"></script>
<script type="text/javascript" src="js/CameraPlayer.js"></script>
<script type="text/javascript" src="js/MeshMove.js"></script>
<script type="text/javascript" src="js/planePos.js"></script>
<script type="text/javascript" src="js/RotateArroundPoint.js"></script>
<script type="text/javascript" src="js/ConsoleCommands.js"></script>
<script type="text/javascript" src="js/Controls.js"></script>
<script type="text/javascript" src="js/ObjectSpawns.js"></script>
<script type="text/javascript" src="js/Editor.js"></script>
<!-- some tutorial https://stemkoski.github.io/Three.js/#mesh-movement-->
<!--free models https://clara.io/view/19a8b999-4807-4252-be15-043b1f6e265c-->
</head>
<body>
<?php
include_once 'blocks/ui.php';
?>
<script>

//--> base variables start 
var clock = new THREE.Clock();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 700 );
camera.position.z=50;

var spawns = new ObjectSpawns();
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
scene.add( cube );
var rotateCamera= new  RotateArroundPoint(camera,cube.position.x,cube.position.y,cube.position.z,1,40,2,1,0);
//<-- create cube end
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
scene.add( objects[0] );
scene.add( objects[1] );
//<-- sphera end


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
	var skyBoxGeometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
//-->create plane start
//texture 1
var texture = THREE.ImageUtils.loadTexture( "img/textures/Grass/Grass4.png" );
texture.wrapS = THREE.RepeatWrapping; 
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 100, 100 ); 
//texture 2
var texture2 = THREE.ImageUtils.loadTexture( "img/textures/Roads/road1.jpg" );
texture2.wrapS = THREE.RepeatWrapping; 
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.set( 100, 100 ); 
    //1882 *1377
var planeW=1000;
var planeH=1000; 
var planeWs=300;
var planeHs=300;
var planeGeo =  new THREE.PlaneGeometry(planeW,planeH,planeWs,planeHs);
 
var planeMat = new THREE.MeshPhongMaterial( { map : texture } );
var planeMat2 = new THREE.MeshLambertMaterial( { map : texture2 } );
planeGeo.materials = [ planeMat,planeMat2];
var plane = new THREE.Mesh(planeGeo, new THREE.MeshFaceMaterial( planeGeo.materials ));    
//planeGeo.faces[4950].materialIndex = 1;

scene.add( plane );

//<--create plane end
//--> camera settings start
//camera.rotation.x = 45 * Math.PI / 180;
//<-- camera settings end
/******************** OBJECT DEFINITIONS END ********************/

/******************** PLAYER FUNCTIONS START ********************/


//var camPlayer= new CameraPlayer(cube,camera);
var delta;
var meshMove = new  MeshMove(cube,camera,rotateCamera);
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

//<-- camera movement script end
//document.addEventListener( 'mousemove', mouseMove, false );
//--> plane edit function start

function editPlane(verticeId, height,plane){
  for(i=0;i<4;i++){
  if(i==1)verticeId+=1;
  if(i==2)verticeId+=planeWs;
  if(i==3)verticeId+=1;	
  plane.geometry.vertices[verticeId].z += height;
  }

  planeGeo.verticesNeedUpdate = true;
 // planeGeo.facesNeedUpdate = true;
}//<-- plane edit end

/*
for ( var i = 0; i<plane.geometry.vertices.length; i++ ) {
         plane.geometry.vertices[i].z = Math.floor((Math.random() * 100) + 1);;
    }
	*/
	//cube.position.x

//camera=camPlayer.setPos(cube.position.x,cube.position.y-60,cube.position.z+60);	  
function update(delta){
updateLabel(delta);
//camera=camPlayer.setPos(cube.position.x,cube.position.y,cube.position.z+100);
meshMove.update(delta);
planeGeo.faces[ 1 ].materialIndex = 1;
planeGeo.faces[ 2 ].materialIndex = 1;
//<-- camera movement
if(cameraMoveX==1){
	if(x<window.innerWidth/2){
      cube.rotation.z += 100*delta * Math.PI / 180;
      
      // RotateArroundPoint(camera.position.x,camera.position.y,cube.position.x,cube.position.y,5);	
	}
	else{
		
	cube.rotation.z -= 100*delta * Math.PI / 180;
	
	
	
	//camera.rotation.z += 10 * Math.PI / 180;
	}
//camera.rotation.y += 1 * Math.PI / 180;
}
}//<--update function end
  //for( var i = 1; i < 200; i ++ ) {
  //  planeGeo.faces[ i ].materialIndex = 1;
//}
/******************** PLAYER FUNCTIONS END ********************/

/*************************************************************/
//Editor environment
var wire = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
var spheraEditor = new THREE.SphereGeometry( 5, 32, 32 );
spheraEditorMesh = new THREE.Mesh(spheraEditor, wire);

var editor = new Editor(spheraEditorMesh,scene,'editorSize','outputConsole','editorEnable');
  
    editor.collisionPlane(plane,300,300,cube,camera);
//var x = document.getElementById("myCheck").checked;
	



/***********************************/
//--->collisions test
var output=document.getElementById('outputConsole');


var collidableMeshList = [];
var arrowList = [];
var directionList = [];

	var wallGeometry = new THREE.BoxGeometry( 10, 10, 20, 1, 1, 1 );
	var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff} );
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe:true } );
	
	var wall = new THREE.Mesh(wallGeometry, wallMaterial);
	wall.position.set(100, 50, 10);
	scene.add(wall);
	collidableMeshList.push(wall);

	
	var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
	wall2.position.set(-150, 50, 5);
	wall2.rotation.y = 3.14159 / 2;
	scene.add(wall2);
	collidableMeshList.push(wall2);

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
			 output.value+="Hit \n"
			}
	}	
}
///<-- colissions end
//--> renderer function start
var render = function () {
requestAnimationFrame( render );
renderer.render(scene, camera);
//update label
delta = clock.getDelta();
update(delta);
rotateLight.update(lightPoint,cube.position.x,cube.position.y,cube.position.z,90*delta,50,2,1,1);
collide();

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
