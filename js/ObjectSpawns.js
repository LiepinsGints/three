// JavaScript Document
function ObjectSpawns(){
	 var objects=[];
	 var lights=[];
	//create sphera
	this.createSphera =function(x,y,z,diameter,segmentsX,segmentsY,_color,scene){

			var spheraGeo = new THREE.SphereGeometry( diameter, segmentsX, segmentsY );
			var spheraMat= new THREE.MeshBasicMaterial( {color: _color} );
			var sphera = new THREE.Mesh( spheraGeo, spheraMat );
			sphera.position.x=x;
			sphera.position.y=y;
			sphera.position.z=z;	
			objects.push(sphera);
			scene.add(objects[objects.length-1]);
		
	}
	//create light
	        
	this.createlightPoint =function(x,y,z,_color,intensity,distance,_scene){
		 alert("Light create");
					var light = new THREE.PointLight( 0xffff00, 5, 100 );
					light.position.set( 50, 50, 50 );
					scene.add( light );
					
			
			
			/*var lightPoint = new THREE.PointLight( _color, intensity, distance );
			lightPoint.position.set( x, y, z );
		
			lights.push(lightPoint);
			scene.add( lights[lights.length-1] );
			*/
		
	}
	
}//<-- class end