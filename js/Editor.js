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
            d=pythagor(
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
              d=pythagor(
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
                        d=pythagor(
                        (plane.geometry.vertices[hVertices[i]].x-plane.geometry.vertices[verticeMedium].x),
                        (plane.geometry.vertices[hVertices[i]].y-plane.geometry.vertices[verticeMedium].y),
                        (plane.geometry.vertices[hVertices[i]].z-plane.geometry.vertices[verticeMedium].z)     
                        );
                        output.value+="vertice  "+i +">distance>"+d+"\n";
                        verticeH1[1]=d;
                        }else{
                         
                             d=pythagor(
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


//Plane colissions 2
/**********************************************************************************/


this.collisionPlane2=function collisionPlane2(plane,planeWs,planeHs,mesh,width,height,camera){
    //Define 
    verticesFormingPlane=new Array();
    
    
    //p=lineCrossPoint(1,3,3,1,1,1,4,4);
    //output.value+="->>"+p[0]+":"+p[1]+"\n";
    mesh.rotation.z=correctRotation(mesh.rotation.z);
    //output.value+="Rotation: "+mesh.rotation.z+"\n";
   // output.value+="mesh rotation degrees: "+ getDegrees(mesh.rotation.z)+"\n";
    //ct=quaternion(10,6,0,5,3,0,90,2,-1);
    //output.value+="point pos: x"+ct[0]+"y"+ct[1]+"z"+ct[2]+"\n";
    //dot=getDotProduct(-6,8,0,5,12,0);
   // output.value+="dotproduct: "+dot+"\n";
    /*if(inTriangle(0,6,0,0,0,0,11,0,0,10,1,1)==1){
         output.value+="INSIDE :)\n";
    }else{
         output.value+="OUTSIDE :/ \n";
    }*/
    //mesh.geometry.computeBoundingBox();
    //width=mesh.geometry.boundingBox.max.x-mesh.geometry.boundingBox.min.x;
    //height=mesh.geometry.boundingBox.max.y-mesh.geometry.boundingBox.min.y;    
    //output.value+="Bounding box width:"+width+" height"+ height+"\n";
    //square vertices
    //quaternion(x,y,z,Xc,Yc,Zc,angle,axes)
    cubeVertices=new Array();
    
    cubeVertices.push(quaternion(mesh.position.x-width/2,
               mesh.position.y+height/2,
               0,
               mesh.position.x,
               mesh.position.y,
               mesh.position.z,
               getDegrees(mesh.rotation.z),
               2));
    cubeVertices.push(quaternion(mesh.position.x+width/2,
               mesh.position.y+height/2,
               0,
               mesh.position.x,
               mesh.position.y,
               mesh.position.z,
               getDegrees(mesh.rotation.z),
               2));
    cubeVertices.push(quaternion(mesh.position.x+width/2,
               mesh.position.y-height/2,
               0,
               mesh.position.x,
               mesh.position.y,
               mesh.position.z,
               getDegrees(mesh.rotation.z),
               2));
    cubeVertices.push(quaternion(mesh.position.x-width/2,
               mesh.position.y-height/2,
               0,
               mesh.position.x,
               mesh.position.y,
               mesh.position.z,
               getDegrees(mesh.rotation.z),
               2));
    //rotate points based on mesh rotation in world
   /* output.value+="v1 x:"+cubeVertices[0][0]+" y:"+cubeVertices[0][1]+"\n"+
                  "v2 x:"+cubeVertices[1][0]+" y:"+cubeVertices[1][1]+"\n"+
                  "v3 x:"+cubeVertices[2][0]+" y:"+cubeVertices[2][1]+"\n"+
                  "v4 x:"+cubeVertices[3][0]+" y:"+cubeVertices[3][1]+"\n";*/
    //calculate box for surrounding vertices
    xmin=cubeVertices[0][0];
    xmax=cubeVertices[0][0];
    ymin=cubeVertices[0][1];
    ymax=cubeVertices[0][1];
    for(i=1;i<cubeVertices.length;i++){
           if(cubeVertices[i][0]>xmax)xmax=cubeVertices[i][0];
           if(cubeVertices[i][0]<xmin)xmin=cubeVertices[i][0];
           if(cubeVertices[i][1]>ymax)ymax=cubeVertices[i][1];
           if(cubeVertices[i][1]<ymin)ymin=cubeVertices[i][1];
            
    }
    
    
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
    //vertice coord x axes
    xPoz=Math.floor(Math.abs((plane.geometry.vertices[0].x-xmin)/segmentWsize));
    yPoz=Math.ceil(Math.abs((plane.geometry.vertices[0].y-ymax)/segmentHsize));
    //alert(Math.ceil(Math.abs((plane.geometry.vertices[0].y-spheraV1[1])/segmentHsize));
    //Get left-upper vertice index
    startVertice=xPoz+yPoz*verticesW;    
    vXCube=Math.abs(Math.ceil((plane.geometry.vertices[startVertice].x-xmax)/segmentWsize));
    //get ammount of vertices on y axes
    vYCube=Math.abs(Math.ceil((plane.geometry.vertices[startVertice].y-ymin)/segmentHsize));
    //get all vertices in mesh not 
    firstImpactHeight=-9999999;
    verticesAffectingMesh=new Array();
    check=0;//if 0 then all vertices got same height
    //get highest vertices
    output.value+="Vertices near mesh: "+vYCube*vXCube+"\n";
    /**********************************************************************/
    /********************Get highest vertice height *************************/
    /**********************************************************************/
    verticesIn=0;
    verticesOut=0;
    for(j=0;j<vYCube;j++){
        if(j!=0)startVertice+=verticesW;
        for(i=startVertice;i<startVertice+vXCube;i++){          
                //check vertice heights
                if(firstImpactHeight<plane.geometry.vertices[i].z){
                    if(firstImpactHeight!=-9999999){
                        check=1;
                    }
                    firstImpactHeight=plane.geometry.vertices[i].z;
                }else if(firstImpactHeight>plane.geometry.vertices[i].z){
                     if(firstImpactHeight!=-9999999){
                        check=1;
                    }
                } 
                //check inside or outside
                 if(inTriangle(cubeVertices[0][0],cubeVertices[0][1],cubeVertices[0][2],
                          cubeVertices[1][0],cubeVertices[1][1],cubeVertices[1][2],
                          cubeVertices[3][0],cubeVertices[3][1],cubeVertices[3][2],
                          plane.geometry.vertices[i].x,
                          plane.geometry.vertices[i].y,
                          plane.geometry.vertices[i].z)==1 || 
                    inTriangle(cubeVertices[2][0],cubeVertices[2][1],cubeVertices[2][2],
                          cubeVertices[1][0],cubeVertices[1][1],cubeVertices[1][2],
                          cubeVertices[3][0],cubeVertices[3][1],cubeVertices[3][2],
                          plane.geometry.vertices[i].x,
                          plane.geometry.vertices[i].y,
                          plane.geometry.vertices[i].z)==1
                 ){ 
                     verticesAffectingMesh.push([i,1,plane.geometry.vertices[i].z]);//id in/out(1/0) height
                     verticesIn++;
                 }else{
                     verticesAffectingMesh.push([i,0,plane.geometry.vertices[i].z]);//id in/out(1/0) height
                     verticesOut++;
                 }//if in triangle in out end
            
            //output.value+="Z: "+plane.geometry.vertices[i].z+"\n";
        }//for 2 end
        
    }//for 1 end
    
    //output.value+="Valid vertices: "+verticesAffectingMesh.length+"\n";
   // output.value+="Check: "+check+"\n";
   // output.value+="Vertices in: "+verticesIn+"\n";
    //output.value+="Vertices out: "+verticesOut+"\n";
    if(check==0){
     mesh.position.z=firstImpactHeight+3;
    }else{
    // mesh.position.z=firstImpactHeight+3;   
    /**********************************************************************/
    /********check if some of vertices inside mesh highest  ***********/
    /**********************************************************************/  
        
      for(i=0;i<verticesAffectingMesh.length;i++){
        if(verticesAffectingMesh[i][1]==1 && verticesAffectingMesh[i][2]==firstImpactHeight){
            check=2;
            break;
        }
      }
      if(check==2){
          //only vertices inside mesh matter
          //locks vertice id distance
          cubeV1Locked=[-1,0];
          cubeV2Locked=[-1,0];
          cubeV3Locked=[-1,0];
          cubeV4Locked=[-1,0];
            for(i=0;i<verticesAffectingMesh.length;i++){
                if(verticesAffectingMesh[i][1]==1 && verticesAffectingMesh[i][2]==firstImpactHeight){
                    //cube_vertice, plane_vertice,distance
                    tempLock=[-1,0,0]
                      for(j=0;j<cubeVertices.length;j++){
                          a=cubeVertices[j][0]-plane.geometry.vertices[verticesAffectingMesh[i][0]].x;
                          b=cubeVertices[j][1]-plane.geometry.vertices[verticesAffectingMesh[i][0]].y;      
                          distance=pythagor(a,b,0);
                          if(j==0){
                            tempLock[0]=j;   
                            tempLock[1]=verticesAffectingMesh[i][0];   
                            tempLock[2]=distance;   
                          }else if(j>0 && tempLock[2]>distance){
                            tempLock[0]=j;   
                            tempLock[1]=verticesAffectingMesh[i][0];   
                            tempLock[2]=distance; 
                          }
                         output.value+="Distance:"+distance+"\n";
                      }//<-- for 2 end
                    output.value+="Locked vertice:"+tempLock[0]+"\n";
                       switch(tempLock[0]){
                            
                           case 0:
                               if(cubeV1Locked[0]==-1){
                                  cubeV1Locked[0]=tempLock[1];   
                                  cubeV1Locked[1]=tempLock[2];   
                               }else if(cubeV1Locked[0]!=-1 && cubeV1Locked[1]<tempLock[2]){
                                  cubeV1Locked[0]=tempLock[1];   
                                  cubeV1Locked[1]=tempLock[2];  
                               }
                           break;
                           case 1:
                               if(cubeV2Locked[0]==-1){
                                  cubeV2Locked[0]=tempLock[1];   
                                  cubeV2Locked[1]=tempLock[2];   
                               }else if(cubeV2Locked[0]!=-1 && cubeV2Locked[1]<tempLock[2]){
                                  cubeV2Locked[0]=tempLock[1];   
                                  cubeV2Locked[1]=tempLock[2];  
                               }
                           break;
                           case 2:
                               if(cubeV3Locked[0]==-1){
                                  cubeV3Locked[0]=tempLock[1];   
                                  cubeV3Locked[1]=tempLock[2];   
                               }else if(cubeV3Locked[0]!=-1 && cubeV3Locked[1]<tempLock[2]){
                                  cubeV3Locked[0]=tempLock[1];   
                                  cubeV3Locked[1]=tempLock[2];  
                               }
                           break;
                           case 3:
                               if(cubeV4Locked[0]==-1){
                                  cubeV4Locked[0]=tempLock[1];   
                                  cubeV4Locked[1]=tempLock[2];   
                               }else if(cubeV4Locked[0]!=-1 && cubeV4Locked[1]<tempLock[2]){
                                  cubeV4Locked[0]=tempLock[1];   
                                  cubeV4Locked[1]=tempLock[2];  
                               }
                           break;       
                       }
                }//<-- id end
            }//<-- for end
          output.value+="*Locked vertices \n"+
                        "v1:"+cubeV1Locked[0]+"\n"+
                        "v2:"+cubeV2Locked[0]+"\n"+
                        "v3:"+cubeV3Locked[0]+"\n"+
                        "v4:"+cubeV4Locked[0]+"\n";
          //If we got at least x3 locked vertices we can get plane equation    
          
             if(cubeV1Locked[0]!=-1){
                 verticesFormingPlane.push(
                [plane.geometry.vertices[cubeV1Locked[0]].x,
                plane.geometry.vertices[cubeV1Locked[0]].y,
                plane.geometry.vertices[cubeV1Locked[0]].z]
             );
             }
             if(cubeV2Locked[0]!=-1){
                verticesFormingPlane.push(
                [plane.geometry.vertices[cubeV2Locked[0]].x,
                plane.geometry.vertices[cubeV2Locked[0]].y,
                plane.geometry.vertices[cubeV2Locked[0]].z]
             );
             }
             if(cubeV3Locked[0]!=-1){
                verticesFormingPlane.push(
                [plane.geometry.vertices[cubeV3Locked[0]].x,
                plane.geometry.vertices[cubeV3Locked[0]].y,
                plane.geometry.vertices[cubeV3Locked[0]].z]
             );
             }
             if(cubeV4Locked[0]!=-1){
                verticesFormingPlane.push(
                [plane.geometry.vertices[cubeV4Locked[0]].x,
                plane.geometry.vertices[cubeV4Locked[0]].y,
                plane.geometry.vertices[cubeV4Locked[0]].z]
             );
             }
          //IF we found x3 locked vertices we can finish else 
          //we got 2 cases only 1 locked vertice or x2 locked vertices
          if(verticesFormingPlane.length<3){
             
              //Vertice id, angle
              tempVertice=[-1,0];
              emp=0;
              inemp=0
              for(i=0;i<verticesAffectingMesh.length;i++){
                  emp++;
                if(verticesAffectingMesh[i][1]==1 && verticesAffectingMesh[i][2]!=firstImpactHeight){
                    inemp++;
                    output.value+="OPA WE ARE HERE \n";
                    //verticesFormingPlane[0][0]
                   // a=1;
                   // b=1;
                    a=Math.abs(verticesFormingPlane[0][0]-plane.geometry.vertices[verticesAffectingMesh[i][0]].x);
                    b=Math.abs(verticesFormingPlane[0][2]-plane.geometry.vertices[verticesAffectingMesh[i][0]].z);
                    if(a==0)
                    a=Math.abs(verticesFormingPlane[0][1]-plane.geometry.vertices[verticesAffectingMesh[i][0]].y);
                    if(b==0)
                    b=Math.abs(verticesFormingPlane[0][1]-plane.geometry.vertices[verticesAffectingMesh[i][0]].y);
                    
                    output.value+="A:"+a+" B:"+b+"\n";
                    tg=b/a;
                    output.value+="tg:"+tg+"\n";
                    deg=getDegrees(Math.atan(tg));
                     output.value+="deg:"+deg+"\n";
                    if(tempVertice[0]==-1){
                        tempVertice[0]=i;
                        tempVertice[1]=deg;
                    }else if(tempVertice[0]!=-1 && tempVertice[1]>deg){
                        tempVertice[0]=i;
                        tempVertice[1]=deg;
                    }
                }
              }
               
              output.value+="************************************\n";
              output.value+="Never used for: "+ tempVertice[0]+"\n";
              output.value+="Emp: "+ emp+"\n";
              output.value+="Emp: "+ inemp+"\n";
              output.value+="************************************\n";
              
                verticesFormingPlane.push(
                [plane.geometry.vertices[tempVertice[0]].x,
                plane.geometry.vertices[tempVertice[0]].y,
                plane.geometry.vertices[tempVertice[0]].z]);
                if(verticesFormingPlane.length<3){
                    ///LAst position here must continue thihellord vertex
                }
              
              
          }
          
          
          //mesh.position.z=firstImpactHeight+3;
      }else{
        for(i=0;i<verticesAffectingMesh.length;i++){
            if(verticesAffectingMesh[i][1]==0 && verticesAffectingMesh[i][2]==firstImpactHeight){
               output.value="SHs :? \n";
               
                for(k=0;k<verticesAffectingMesh.length;k++){
                    if(verticesAffectingMesh[k][1]==1){
                        insideVertice=-1;
                        if(verticesAffectingMesh[i][0]-1==verticesAffectingMesh[k][0]){
                            output.value="LEFT \n";
                            insideVertice=verticesAffectingMesh[i][0]-1;
                        }
                        if(verticesAffectingMesh[i][0]+1==verticesAffectingMesh[k][0]){
                            output.value="RIGHT \n";
                            insideVertice=verticesAffectingMesh[i][0]+1;
                        }
                        if(insideVertice!=-1){
                          //get 2 closest cube vertices
                          //cubeVertices[0][0]
                            vx1=[0,-1];
                            vx2=[0,-1];
                            for(l=0;l<cubeVertices.length;l++){
                                d=pythagor(cubeVertices[l][0]-
                                         plane.geometry.vertices[verticesAffectingMesh[i][0]].x,
                                         cubeVertices[l][1]-
                                         plane.geometry.vertices[verticesAffectingMesh[i][0]].y,0);
                                if(l==0){
                                    vx1[0]=l;
                                    vx1[1]=d;
                                }else if(l>0){
                                    if(d<vx1[1]){
                                        vx2[0]=vx1[0];
                                        vx2[1]=vx1[1];
                                        vx1[0]=l;
                                        vx1[1]=d;
                                    }else if(vx2[1]==-1 && l!=vx1[0]){
                                        vx2[0]=l;
                                        vx2[1]=d;
                                       
                                    }else if(d>=vx1[1] && d<vx2[1]){
                                        vx2[0]=l;
                                        vx2[1]=d;
                                    }
                                        
                                }
                                
                                
                                
                                output.value+="Val :"+d+"\n";
                                
                                
                                         
                            }
                            p=lineCrossPoint(cubeVertices[vx1[0]][0],
                                             cubeVertices[vx1[0]][1],
                                             cubeVertices[vx2[0]][0],
                                             cubeVertices[vx2[0]][1],
                                             plane.geometry.vertices[insideVertice].x,
                                             plane.geometry.vertices[insideVertice].y,
                                             plane.geometry.vertices[verticesAffectingMesh[i][0]].x,
                                             plane.geometry.vertices[verticesAffectingMesh[i][0]].y);
                            output.value+="point->>"+p[0]+":"+p[1]+"\n";
                            output.value+="inside->>"+plane.geometry.vertices[insideVertice].x+":"
                                +plane.geometry.vertices[insideVertice].y+"\n";
                            output.value+="outside->>"+plane.geometry.vertices[verticesAffectingMesh[i][0]].x+":"
                                +plane.geometry.vertices[verticesAffectingMesh[i][0]].y+"\n";
                            output.value+="Selected :"+vx1[1]+":"+vx2[1]+"\n";
                            //??????WE got point now need height
                            hip=pythagor(plane.geometry.vertices[insideVertice].x- 
                                         plane.geometry.vertices[verticesAffectingMesh[i][0]].x,
                                         plane.geometry.vertices[insideVertice].x- 
                                         plane.geometry.vertices[verticesAffectingMesh[i][0]].x,
                                         0
                                        );
                            output.value+="Hipot: "+hip+"\n";
                            sinB=sinValue(plane.geometry.vertices[insideVertice].x-
                                          plane.geometry.vertices[verticesAffectingMesh[i][0]].x,hip);
                            katet=plane.geometry.vertices[insideVertice].x-p[0];
                            sinBDeg=getDegrees(Math.asin(sinB));
                            sinA=Math.sin(getRadians(90-sinBDeg));
                            getHeight=katet/sinA*sinB+plane.geometry.vertices[insideVertice].z;
                            verticesAffectingMesh[i][2]=getHeight;
                            verticesAffectingMesh[i][1]=3;
                            output.value+="Angle sinb: "+sinBDeg+"\n";
                            output.value+="Height: "+getHeight+"\n";
                            mesh.position.z=getHeight+3; 
                        }
                    }
                   
                }//<-- for end
            }//<-- if end
        }//for end
          
      }//<-- else 2 end
    
    
    }//<-- else check end
    
    /**********************************************************************/
    /********Calculate plane and point location on plane  ***********/
    /**********************************************************************/
    if(verticesFormingPlane.length>=3){
     vectorA=[verticesFormingPlane[1][0]-verticesFormingPlane[0][0],
              verticesFormingPlane[1][1]-verticesFormingPlane[0][1],
              verticesFormingPlane[1][2]-verticesFormingPlane[0][2]];
     vectorB=[verticesFormingPlane[2][0]-verticesFormingPlane[0][0],
              verticesFormingPlane[2][1]-verticesFormingPlane[0][1],
              verticesFormingPlane[2][2]-verticesFormingPlane[0][2]];
    
    i=vectorA[1]*vectorB[2]-vectorA[2]*vectorB[1];
    j=(vectorA[0]*vectorB[2]-vectorA[2]*vectorB[0])*(-1);
    k=vectorA[0]*vectorB[1]-vectorA[1]*vectorB[0];
    d=(i*verticesFormingPlane[0][0]+j*verticesFormingPlane[0][1]+
        k*verticesFormingPlane[0][2])*(-1);
        
    zValue=(i*mesh.position.x+j*mesh.position.y+d)/k*(-1);
    //camera.position.z+=zValue-mesh.position.z+Math.abs(mesh.geometry.boundingBox.max.z-mesh.geometry.boundingBox.min.z)/2;
    if(k!=0)
    mesh.position.z=zValue+3;
        //else mesh.position.z=+3;
    output.value+="ZVALUE:"+zValue+"\n";     
    }
    else{
        
     output.value+="ERROR not enaught vertices for plane forming... \n";   
    }
    
    
    output.scrollTop=output.scrollHeight; 
    
}//<-- col detection 2 end

}