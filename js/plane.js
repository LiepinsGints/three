var planeW=1000;
var planeH=1000; 
var planeWs=500;
var planeHs=500;
var planeGeo =  new THREE.PlaneGeometry(planeW,planeH,planeWs,planeHs);
 
var planeMat = new THREE.MeshPhongMaterial();
 planeMat.map    = THREE.ImageUtils.loadTexture('img/Earth/earth.png');
// planeMat.bumpMap    = THREE.ImageUtils.loadTexture('img/Planets/Earth/earthbump1k.jpg');
 planeMat.bumpScale = 10;
var plane = new THREE.Mesh(planeGeo, planeMat);    
//planeGeo.faces[4950].materialIndex = 1;
