// JavaScript Document

function Editor(mesh,_scene,_input,_output,_enabled){
var state=0;
var input=document.getElementById(_input);
var output=document.getElementById(_output);
var enabled=document.getElementById(_enabled);
var scene =_scene;
object=mesh;

this.enable =function(){
  if(enabled.checked){
	  scene.add(object);
  }else{
	  scene.remove(object);
  }
}
this.update =function(){
if(enabled.checked){
increment=(Number(input.value)-state)/50;
	/*if(Number(input.value)<=state)
		increment*=-1;*/

output.value+="State:"+state+" increment: "+increment+" \n";

		object.scale.x += increment;
		object.scale.y += increment;
		object.scale.z += increment;
        
        
    
        
 		state=Number(input.value);
}

    
}
this.follow =function(x,y,z){
        object.position.x=x;
        object.position.y=y;
        object.position.z=z;
}
// planee editor sphera
this.editPlaneSphera=function editPlaneSphera(plane,planeWs,planeHs,sphera,heightIncrement){
    //get vertice count x axes
    verticesW=planeWs+1;
    //get vertice count y axes
    verticesH=planeHs+1;
    //total vertices
    totalVertices=verticesW*verticesH;                                           
    //get plane width and height                                           
    planeW=plane.geometry.vertices[0].x-plane.geometry.vertices[totalVertices-1].x;                                           
    planeH=plane.geometry.vertices[0].y-plane.geometry.vertices[totalVertices-1].y;                                           
    //get vertice dimensions
    segmentWsize=planeW/planeWs;
    segmentHsize=planeH/planeHs;
    //get v1 and v4 from cube arround circle
    //alert(sphera.geometry.boundingSphere.radius*sphera.scale.x);
    spheraRadius=sphera.geometry.boundingSphere.radius*sphera.scale.x;
    spheraV1=[sphera.position.x-spheraRadius , sphera.position.y+spheraRadius];                                           
    spheraV2=[sphera.position.x+spheraRadius , sphera.position.y-spheraRadius];                                           
    //vertice coord x axes
    xPoz=Math.ceil(Math.abs((plane.geometry.vertices[0].x-spheraV1[0])/segmentWsize));
    yPoz=Math.floor(Math.abs((plane.geometry.vertices[0].y-spheraV1[1])/segmentHsize));
    //Get left-upper vertice index
    startVertice=xPoz+yPoz*verticesW;
    
   
    
    //get ammount of vertices on x axes
    vXCube=Math.abs(Math.ceil((plane.geometry.vertices[startVertice].x-spheraV2[0])/segmentWsize));
    //get ammount of vertices on y axes
    vYCube=Math.abs(Math.floor((plane.geometry.vertices[startVertice].y-spheraV2[1])/segmentHsize));
    //increment vertices by some value
    for(j=0;j<vYCube;j++){
        startVertice+=verticesW;
        for(i=startVertice;i<startVertice+vXCube;i++){
            plane.geometry.vertices[i].z+=heightIncrement;
        
        
        }
    }
        
    
     output.value+="verticesW:"+verticesW+ "\n"
    +"verticesH:"+verticesH+ "\n"
    +"totalVertices:"+totalVertices+ "\n"
    +"planeW:"+planeW+ "\n"
    +"planeH:"+planeH+ "\n"
     +"segmentWsize:"+segmentWsize+ "\n"
     +"segmentWsize:"+segmentHsize+ "\n"
     +"spheraV1:"+spheraV1[0]+":"+spheraV1[1]+"\n"
    +"spheraV2:"+spheraV2[0]+":"+spheraV2[1]+"\n"
    +"xPoz:"+xPoz+ "\n"
    +"yPoz:"+yPoz+ "\n"
    +"startVertice:"+startVertice+ "\n"
    +"vXCube:"+vXCube+ "\n"
    +"vYCube:"+vYCube+ "\n" 
     ;
      
    planeGeo.verticesNeedUpdate = true;
    //plane first vertice coordinate and last vertice coordinates
    //plane.geometry.vertices[verticeId].z
    


}
//Plane colissions
this.collisionPlane=function collisionPlane(plane,planeWs,planeHs,mesh,camera){
  //get vertice count x axes
    verticesW=planeWs+1;
    //get vertice count y axes
    verticesH=planeHs+1;
    //total vertices
    totalVertices=verticesW*verticesH;                                           
    //get plane width and height                                           
    planeW=plane.geometry.vertices[0].x-plane.geometry.vertices[totalVertices-1].x;                                           
    planeH=plane.geometry.vertices[0].y-plane.geometry.vertices[totalVertices-1].y;                                           
    //get vertice dimensions
    segmentWsize=planeW/planeWs;
    segmentHsize=planeH/planeHs;
    //get v1 and v4 from cube arround circle
    //alert(sphera.geometry.boundingSphere.radius*sphera.scale.x);
    //mesh.geometry.computeBoundingSphere();
    mesh.geometry.computeBoundingBox();
    spheraRadius=(mesh.geometry.boundingBox.max.x-mesh.geometry.boundingBox.min.x)/2;
    cubeV1=[mesh.position.x-spheraRadius,mesh.position.y+spheraRadius];
    //spheraRadius=Math.sqrt(Math.pow((cubeV1[0]-mesh.position.x),2)+Math.pow((cubeV1[1]-mesh.position.x),2));
    //alert(mesh.geometry.boundingBox.max);
    
    spheraV1=[mesh.position.x-spheraRadius , mesh.position.y+spheraRadius];                                           
    spheraV2=[mesh.position.x+spheraRadius , mesh.position.y-spheraRadius];                                           
    //vertice coord x axes
    xPoz=Math.ceil(Math.abs((plane.geometry.vertices[0].x-spheraV1[0])/segmentWsize));
    yPoz=Math.floor(Math.abs((plane.geometry.vertices[0].y-spheraV1[1])/segmentHsize));
    //Get left-upper vertice index
    startVertice=xPoz+yPoz*verticesW;    
    //get ammount of vertices on x axes
    vXCube=Math.abs(Math.ceil((plane.geometry.vertices[startVertice].x-spheraV2[0])/segmentWsize));
    //get ammount of vertices on y axes
    vYCube=Math.abs(Math.floor((plane.geometry.vertices[startVertice].y-spheraV2[1])/segmentHsize));
    //increment vertices by some value
    
    //
    verticeHighest=startVertice;
    verticeMedium=startVertice;
    verticeLow=startVertice;
    
    for(j=0;j<vYCube;j++){
        startVertice+=verticesW;
        for(i=startVertice;i<startVertice+vXCube;i++){
           
            if(plane.geometry.vertices[i].z>plane.geometry.vertices[verticeHighest].z){
                verticeHighest=i;
                
            }else if(plane.geometry.vertices[i].z>plane.geometry.vertices[verticeMedium].z ||verticeHighest==verticeMedium){
                verticeMedium=i;
            }else if(plane.geometry.vertices[i].z>plane.geometry.vertices[verticeLow].z ||verticeHighest==verticeLow){
              
               if((plane.geometry.vertices[verticeHighest].x==plane.geometry.vertices[verticeHighest].x &&
                  plane.geometry.vertices[verticeHighest].x==plane.geometry.vertices[i].x) 
                  ||
                  (plane.geometry.vertices[verticeHighest].y==plane.geometry.vertices[verticeHighest].y &&
                  plane.geometry.vertices[verticeHighest].y==plane.geometry.vertices[i].y) 
                 ) {}else verticeLow=i;
                        
                
            }
        
        
        }
    }
    //Get plane from 3 points
     vectorA=[plane.geometry.vertices[verticeMedium].x-plane.geometry.vertices[verticeHighest].x,
              plane.geometry.vertices[verticeMedium].y-plane.geometry.vertices[verticeHighest].y,
              plane.geometry.vertices[verticeMedium].z-plane.geometry.vertices[verticeHighest].z];
     vectorB=[plane.geometry.vertices[verticeLow].x-plane.geometry.vertices[verticeHighest].x,
              plane.geometry.vertices[verticeLow].y-plane.geometry.vertices[verticeHighest].y,
              plane.geometry.vertices[verticeLow].z-plane.geometry.vertices[verticeHighest].z];
    
    i=vectorA[1]*vectorB[2]-vectorA[2]*vectorB[1];
    j=(vectorA[0]*vectorB[2]-vectorA[2]*vectorB[0])*(-1);
    k=vectorA[0]*vectorB[1]-vectorA[1]*vectorB[0];
    d=(i*plane.geometry.vertices[verticeHighest].x+j*plane.geometry.vertices[verticeHighest].y+
        k*plane.geometry.vertices[verticeHighest].z)*(-1);
    
    

    
    zValue=0;
    if(k!=0){   
    zValue=(i*mesh.position.x+j*mesh.position.y+d)/k*(-1);
    camera.position.z+=zValue-mesh.position.z+spheraRadius;
    mesh.position.z=zValue+spheraRadius;    
        
    }
    /*
        output.value+=
         verticeHighest+"==>"
         +    plane.geometry.vertices[verticeHighest].x
         +"|"+plane.geometry.vertices[verticeHighest].y
         +"|"+plane.geometry.vertices[verticeHighest].z+"\n"
         +verticeMedium
         +"==>"
         +plane.geometry.vertices[verticeMedium].x
         +"|"+plane.geometry.vertices[verticeMedium].y
         +"|"+plane.geometry.vertices[verticeMedium].z+"\n"
         +verticeLow+"==>"+plane.geometry.vertices[verticeLow].x
         +"|"+plane.geometry.vertices[verticeLow].y
         +"|"+plane.geometry.vertices[verticeLow].z+"\n"+
         "i:"+i+" j:"+j+" k:"+k+" d:"+d+ "\n"
        +"zValue:"+zValue+ "\n"
        +"spheraRadius:"+spheraRadius+ "\n";
        */
   // camera.position.z+=zValue+spheraRadius-mesh.position.z ;
    
    
    
   
    

}

}