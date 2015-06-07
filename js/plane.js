//grass
var grass = THREE.ImageUtils.loadTexture( "img/textures/Grass/Grass4.png" );
grass.wrapS = THREE.RepeatWrapping; 
grass.wrapT = THREE.RepeatWrapping;
grass.repeat.set( 200, 200 ); 
//grass
var grassDehydrated = THREE.ImageUtils.loadTexture( "img/textures/Grass/Grass4Dehydrated.jpg" );
grassDehydrated.wrapS = THREE.RepeatWrapping; 
grassDehydrated.wrapT = THREE.RepeatWrapping;
grassDehydrated.repeat.set( 200, 200 ); 
//sand
var sand = THREE.ImageUtils.loadTexture( "img/textures/Sand/sand2.jpg" );
sand.wrapS = THREE.RepeatWrapping; 
sand.wrapT = THREE.RepeatWrapping;
sand.repeat.set( 200, 200 ); 
//stone
var stone = THREE.ImageUtils.loadTexture( "img/textures/Stone/stone4.png" );
stone.wrapS = THREE.RepeatWrapping; 
stone.wrapT = THREE.RepeatWrapping;
stone.repeat.set( 200, 200 ); 
//texture 2
var texture2 = THREE.ImageUtils.loadTexture( "img/textures/Roads/road1.jpg" );
texture2.wrapS = THREE.RepeatWrapping; 
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.set( 100, 100 ); 


    //1882 *1377
var planeW=1000;
var planeH=1000; 
var planeWs=400;
var planeHs=400;
var planeGeo =  new THREE.PlaneGeometry(planeW,planeH,planeWs,planeHs);
 
var planeMat = new THREE.MeshPhongMaterial( { map : grassDehydrated } );
var planeMat2 = new THREE.MeshLambertMaterial( { map : sand } );
var planeMat3 = new THREE.MeshPhongMaterial( { map : grass } );
var planeMat4 = new THREE.MeshLambertMaterial( { map : stone } );
planeGeo.materials = [ planeMat,planeMat2,planeMat3,planeMat4];
var plane = new THREE.Mesh(planeGeo, new THREE.MeshFaceMaterial( planeGeo.materials ));    
//planeGeo.faces[4950].materialIndex = 1;