function Planets(){

    this.addSun=function addSun () {
        positionX=-100;
        positionY=0;
        positionZ=25;
        geometry   = new THREE.SphereGeometry(50, 32, 32);
        material  = new THREE.MeshPhongMaterial();
        sunMesh = new THREE.Mesh(geometry, material);
        sunMesh.position.x=positionX;
        sunMesh.position.y=positionY;
        sunMesh.position.z=positionZ;
        sunMesh.rotation.y=getRadians(20);
        sunMesh.rotation.x=getRadians(90);
        //bump texture
        material.map    = THREE.ImageUtils.loadTexture('img/Planets/Sun/sunmap.jpg');      
        return sunMesh;
    }
    
    
     /****Create mercury*/
    this.createPlanet=function createPlanet (materialMap,bumpMap,bumpScale,radius,widthSeg, heightSeg) {
        geometry   = new THREE.SphereGeometry(radius, widthSeg, heightSeg);
        material  = new THREE.MeshPhongMaterial();
        planetMesh = new THREE.Mesh(geometry, material);
        planetMesh.rotation.y=getRadians(20);
        planetMesh.rotation.x=getRadians(90);
        //bump texture
        material.map    = THREE.ImageUtils.loadTexture(materialMap);
        material.bumpMap    = THREE.ImageUtils.loadTexture(bumpMap);
        material.bumpScale = bumpScale;
        return planetMesh;
    }
    
    /****Create earth*/
    this.addEarth=function addEarth () {
        positionZ=15;
        geometry   = new THREE.SphereGeometry(13, 32, 32);
        material  = new THREE.MeshPhongMaterial();
        earthMesh = new THREE.Mesh(geometry, material);
        earthMesh.position.z=positionZ;
        earthMesh.rotation.y=getRadians(20);
         earthMesh.rotation.x=getRadians(90);
        //bump texture
        material.map    = THREE.ImageUtils.loadTexture('img/Planets/Earth/earthmap1k.jpg');
        material.bumpMap    = THREE.ImageUtils.loadTexture('img/Planets/Earth/earthbump1k.jpg');
        material.bumpScale = 0.5;
        //spectacular
        material.specularMap    = THREE.ImageUtils.loadTexture('img/Planets/Earth/earthspec1k.jpg');
        material.specular  = new THREE.Color('grey');
       return earthMesh;
    }
 
    /****Create moon*/
    this.addMoon=function addMoon () {
        positionX=-20;
        positionY=0;
        positionZ=15;
        geometry   = new THREE.SphereGeometry(4, 32, 32);
        material  = new THREE.MeshPhongMaterial();
        moonMesh = new THREE.Mesh(geometry, material);
        
        moonMesh.position.x=positionX;
        moonMesh.position.y=positionY;
        moonMesh.position.z=positionZ;
        moonMesh.rotation.y=getRadians(20);
        moonMesh.rotation.x=getRadians(90);
        //bump texture
        material.map    = THREE.ImageUtils.loadTexture('img/Planets/Moon/moonmap1k.jpg');
        material.bumpMap    = THREE.ImageUtils.loadTexture('img/Planets/Moon/moonbump1k.jpg');
        material.bumpScale = 0.01;
        return moonMesh;
    }

}//<-- class end