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
this.distance =function distance(x,y,z){
       return Math.sqrt(x*x +y*y+z*z);
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
    vYCube=Math.abs(Math.ceil((plane.geometry.vertices[startVertice].y-spheraV2[1])/segmentHsize));
    //increment vertices by some value
    for(j=0;j<vYCube;j++){
        if(j!=0)startVertice+=verticesW;
        for(i=startVertice;i<startVertice+vXCube;i++){
            d=this.distance(
                (plane.geometry.vertices[i].x-mesh.position.x),
                (plane.geometry.vertices[i].y-mesh.position.y),
                (plane.geometry.vertices[i].z-mesh.position.z)     
            );
            if(d<=spheraRadius)
            plane.geometry.vertices[i].z+=heightIncrement;
        
        
        }
    }
        
    /*
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
      */
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
    spheraRadius=4.24;
    //cubeV1=[mesh.position.x-spheraRadius,mesh.position.y+spheraRadius];
    //spheraRadius=Math.sqrt(Math.pow((cubeV1[0]-mesh.position.x),2)+Math.pow((cubeV1[1]-mesh.position.x),2));
    //alert(mesh.geometry.boundingBox.max);
    
    spheraV1=[mesh.position.x-spheraRadius , mesh.position.y+spheraRadius];                                           
    spheraV2=[mesh.position.x+spheraRadius , mesh.position.y-spheraRadius];                                           
    //vertice coord x axes
    xPoz=Math.floor(Math.abs((plane.geometry.vertices[0].x-spheraV1[0])/segmentWsize));
    yPoz=Math.floor(Math.abs((plane.geometry.vertices[0].y-spheraV1[1])/segmentHsize));
    //alert(Math.ceil(Math.abs((plane.geometry.vertices[0].y-spheraV1[1])/segmentHsize));
    //Get left-upper vertice index
    startVertice=xPoz+yPoz*verticesW;    
    //get ammount of vertices on x axes
    //spheraV1=[plane.geometry.vertices[startVertice].x,plane.geometry.vertices[startVertice].y];
    //spheraV2=[spheraV1[0]+(mesh.position.x-spheraV1[0])*2,spheraV1[1]+(mesh.position.y-spheraV1[1])*2];
   // alert("v1"+spheraV1[0]+":"+spheraV1[1]+"\n "+"v2"+spheraV2[0]+":"+spheraV2[1]+"\n ");
    vXCube=Math.abs(Math.ceil((plane.geometry.vertices[startVertice].x-spheraV2[0])/segmentWsize));
    //get ammount of vertices on y axes
    vYCube=Math.abs(Math.ceil((plane.geometry.vertices[startVertice].y-spheraV2[1])/segmentHsize));
    //increment vertices by some value
    
    //test cowered area
       /* var geometry = new THREE.PlaneGeometry( spheraRadius*2, spheraRadius*2, 2,2 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        var planex = new THREE.Mesh( geometry, material );
        planex.position.z=2;
        scene.add( planex );*/
    
    //
    verticeHighest=startVertice;
    verticeMedium=-1;
    verticeLow=-1;
    /*output.value+="**********coords start \n";*/
    
    //get highest vertices
    st=startVertice;
    hVertices= new Array();
    check=1;//if 1 then all vertices same height
    for(j=0;j<vYCube;j++){
        if(j!=0)startVertice+=verticesW;
        for(i=startVertice;i<startVertice+vXCube;i++){        
              d=this.distance(
                (plane.geometry.vertices[i].x-mesh.position.x),
                (plane.geometry.vertices[i].y-mesh.position.y),
                (plane.geometry.vertices[i].z-mesh.position.z)     
            );
            if(d<=spheraRadius){
            if(plane.geometry.vertices[i].z>plane.geometry.vertices[verticeHighest].z){
            verticeHighest=i;
            }
            
            if(plane.geometry.vertices[i].z!=plane.geometry.vertices[startVertice].z){
             check=0;   
            }
            }
        
        }
    }
   //get medium vertice
    if(check==0){
    startVertice=st;
    verticeTemp=[-1,0];
     for(j=0;j<vYCube;j++){
        if(j!=0)startVertice+=verticesW;
        for(i=startVertice;i<startVertice+vXCube;i++){   
            
            if(plane.geometry.vertices[i].z==plane.geometry.vertices[verticeHighest].z){
                hVertices.push(i);
               // alert("here");
            }
            if(plane.geometry.vertices[i].z<plane.geometry.vertices[verticeHighest].z){
                
                 m=(plane.geometry.vertices[verticeHighest].z-plane.geometry.vertices[i].z)
                 
                 / (plane.geometry.vertices[verticeHighest].x-plane.geometry.vertices[i].x);
                
                z=m*(mesh.position.x-plane.geometry.vertices[i].x)+plane.geometry.vertices[i].z;
                d=Math.abs(z-mesh.position.z);
                if(verticeTemp[0]==-1){
                    verticeTemp[0]=i;
                    verticeTemp[1]=d;    
                }
                else if(verticeTemp[1]>d){
                    verticeTemp[0]=i;
                    verticeTemp[1]=d;
                }
                //verticeTemp=[i,;
            }
        
        }
    }verticeMedium=verticeTemp[0];
        startVertice=st;
        verticeTemp=[-1,0];
            verticeH1=[-1,0];
            verticeH2=[-1,0];
            if(hVertices.length>1){
                for(i=0;i<hVertices.length;i++){
                    if(verticeH1[0]==-1){
                        verticeH1[0]=i;
                        d=this.distance(
                        (plane.geometry.vertices[hVertices[i]].x-plane.geometry.vertices[verticeMedium].x),
                        (plane.geometry.vertices[hVertices[i]].y-plane.geometry.vertices[verticeMedium].y),
                        (plane.geometry.vertices[hVertices[i]].z-plane.geometry.vertices[verticeMedium].z)     
                        );
                        output.value+="vertice  "+i +">distance>"+d+"\n";
                        verticeH1[1]=d;
                        }else{
                         
                             d=this.distance(
                             (plane.geometry.vertices[hVertices[i]].x-plane.geometry.vertices[verticeMedium].x),
                             (plane.geometry.vertices[hVertices[i]].y-plane.geometry.vertices[verticeMedium].y),
                             (plane.geometry.vertices[hVertices[i]].z-plane.geometry.vertices[verticeMedium].z)     
                              );
                            if(d<verticeH1[1]){
                                verticeH2[0]=verticeH1[0];
                                verticeH2[1]=verticeH1[1];
                                verticeH1[0]=i;
                                verticeH1[1]=d;       
                            }else if(d==verticeH1[1] && i!=verticeH1[0] ){
                                verticeH2[0]=i;
                                verticeH2[1]=d;   
                            }else if(d>verticeH1[1] && verticeH2[0]==-1 && i!=verticeH1[0]){
                                verticeH2[0]=i;
                                verticeH2[1]=d; 
                            }
                            else if(d>verticeH1[1] && verticeH2[1]>d && i!=verticeH1[0]){
                                verticeH2[0]=i;
                                verticeH2[1]=d; 
                            }
                           output.value+="vertice  "+i +">distance>"+d+"\n"; 
                            
                        }
                    
                
              }//for
               output.value+="vertice from array "+verticeH1[0] +">>"+verticeH2[0]+"\n"; 
                
                verticeHighest=hVertices[verticeH1[0]];
                verticeLow=hVertices[verticeH2[0]];
                if(vYCube*vXCube/2<hVertices.length){
                  
                    for(i=0;i<hVertices.length;i++){
                        if(i!=verticeH1[0]&& i!=verticeH2[0])
                            verticeMedium=i;   
                    }
                }
                //lookup for farest medium vertice
                
                
                //output.value+="-1->"+verticeHighest+":"+verticeMedium+":"+verticeLow;
           }//<--IF h verticeS>1 end
        else{
        //get low vertice
     for(j=0;j<vYCube;j++){
        if(j!=0)startVertice+=verticesW;
        for(i=startVertice;i<startVertice+vXCube;i++){        
            if(plane.geometry.vertices[i].z<=plane.geometry.vertices[verticeMedium].z && i!=verticeMedium){
                
                 m=(plane.geometry.vertices[verticeHighest].z-plane.geometry.vertices[i].z)
                 
                 / (plane.geometry.vertices[verticeHighest].x-plane.geometry.vertices[i].x);
                
                z=m*(mesh.position.x-plane.geometry.vertices[i].x)+plane.geometry.vertices[i].z;
                d=Math.abs(z-mesh.position.z);
                if(verticeTemp[0]==-1){
                    verticeTemp[0]=i;
                    verticeTemp[1]=d;    
                }
                else if(verticeTemp[1]>d){
                    verticeTemp[0]=i;
                    verticeTemp[1]=d;
                }
                //verticeTemp=[i,;
            }
        
        }
    } verticeLow =verticeTemp[0]; 
        }
    }else if(check==1){
        verticeHighest=startVertice;
        verticeMedium=startVertice+verticesW;
        verticeLow=startVertice+vXCube-1;
        
    }
    
   // output.value+="StartVertice: "+startVertice+"\n";
   for(i=0;i<hVertices.length;i++){
    output.value+="vertice :"+hVertices[i]+" \n";
    if(i==hVertices.length-1)output.value+="**********************************\n";
   }
 /*  output.value+="-------------------------- \n";*/
    //output.value+="-2->"+verticeHighest+":"+verticeMedium+":"+verticeLow;
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
    camera.position.z+=zValue-mesh.position.z+Math.abs(mesh.geometry.boundingBox.max.z-mesh.geometry.boundingBox.min.z)/2;
    mesh.position.z=zValue+Math.abs(mesh.geometry.boundingBox.max.z-mesh.geometry.boundingBox.min.z)/2;    
      /*  output.value+="--->non zero k: \n"+
        verticeHighest+"->"+plane.geometry.vertices[verticeHighest].x
         +"|"+plane.geometry.vertices[verticeHighest].y
         +"|"+plane.geometry.vertices[verticeHighest].z+"\n"
    +verticeMedium+"->"+plane.geometry.vertices[verticeMedium].x+"|"+plane.geometry.vertices[verticeMedium].y
    +"|"+plane.geometry.vertices[verticeMedium].z+"\n"
    +verticeLow+plane.geometry.vertices[verticeLow].x
         +"|"+plane.geometry.vertices[verticeLow].y
         +"|"+plane.geometry.vertices[verticeLow].z+"\n"
    +"************\n"; */   
    }else{
    camera.position.z+=zValue-mesh.position.z+spheraRadius;
    mesh.position.z=zValue+spheraRadius;    
    output.value+="--->zero k: \n"+
        verticeHighest+"->"+plane.geometry.vertices[verticeHighest].x
         +"|"+plane.geometry.vertices[verticeHighest].y
         +"|"+plane.geometry.vertices[verticeHighest].z+"\n"
    +verticeMedium+"->"+plane.geometry.vertices[verticeMedium].x+"|"+plane.geometry.vertices[verticeMedium].y
    +"|"+plane.geometry.vertices[verticeMedium].z+"\n"
    +verticeLow+plane.geometry.vertices[verticeLow].x
         +"|"+plane.geometry.vertices[verticeLow].y
         +"|"+plane.geometry.vertices[verticeLow].z+"\n"
    +"************\n";   
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
    
    
    
   
  output.scrollTop=output.scrollHeight;  

}

}