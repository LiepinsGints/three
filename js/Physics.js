function Physics(_output){
//!Class requires math three.js and math.js    
/************************************************/    
/*********Variables **********/
/************************************************/
meshRotationZ=-999999999;    
cubeVertices=new Array();   
//cube bounding box values
xmin=0;
xmax=0;
ymin=0;
ymax=0;
//Vertice count
verticesW=-1;
verticesH=-1;
totalVertices=-1;    
planeW=-1;
planeH=-1;  
segmentWsize=-1;   
segmentHsize=-1; 
//Output block    
output=document.getElementById(_output);    
/************************************************/    
/*********Get cube vertices and bounds **********/
/************************************************/    
function getCubeVertices(mesh,width,height){
    cubeVertices=new Array();
    //output.value+="Mesh rotation: "+mesh.rotation.z+"\n";
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
    //cube bounding box values
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
}
/************************************************/    
/*********Get plane values and vertice count per axes **********/
/************************************************/    
function getPlaneValues(plane,planeWs,planeHs){ 
    verticesW=planeWs+1;
    verticesH=planeHs+1;
    totalVertices=verticesW*verticesH;                                                                                   
    planeW=Math.abs(plane.geometry.vertices[0].x-plane.geometry.vertices[totalVertices-1].x);                                           
    planeH=Math.abs(plane.geometry.vertices[0].y-plane.geometry.vertices[totalVertices-1].y);                                           
    segmentWsize=planeW/planeWs;
    segmentHsize=planeH/planeHs;                                      
}
/************************************************/    
/*********Get first left upper vertice coords **********/
/************************************************/
 function getStartVertice(plane){   
    xPoz=Math.floor(Math.abs((plane.geometry.vertices[0].x-xmin)/segmentWsize));
  //  output.value+="xPoz:"+xPoz+"\n";  
    yPoz=Math.ceil(Math.abs((plane.geometry.vertices[0].y-ymax)/segmentHsize));
//    output.value+="yPoz:"+yPoz+"\n"; 
  //  output.value+="xmin:"+xmin+"\n";  
  //  output.value+="ymax:"+ymax+"\n";
  //  output.value+="segmentWsize:"+segmentWsize+"\n";
   // output.value+="segmentHsize:"+segmentHsize+"\n";
    startVertice=xPoz+yPoz*verticesW;  
    return startVertice;
 }
/************************************************/    
/*********Vertice in mesh **********/
/************************************************/
 function verticeInMesh(plane,verticeId){ 
   if(inTriangle(
       cubeVertices[0][0],cubeVertices[0][1],cubeVertices[0][2],
       cubeVertices[1][0],cubeVertices[1][1],cubeVertices[1][2],
       cubeVertices[3][0],cubeVertices[3][1],cubeVertices[3][2],
       plane.geometry.vertices[verticeId].x,
       plane.geometry.vertices[verticeId].y,
       plane.geometry.vertices[verticeId].z)==1 || 
       inTriangle(
       cubeVertices[2][0],cubeVertices[2][1],cubeVertices[2][2],
       cubeVertices[1][0],cubeVertices[1][1],cubeVertices[1][2],
       cubeVertices[3][0],cubeVertices[3][1],cubeVertices[3][2],
       plane.geometry.vertices[verticeId].x,
       plane.geometry.vertices[verticeId].y,
       plane.geometry.vertices[verticeId].z)==1
       ){ 
            return 1;
        }else{
            return 0;
        }
     return 0;
 }
/************************************************/    
/*********Closest cube vertice to point **********/
/************************************************/  
function cubeVerticesNearPoint(x,y){
    vertice=[0,999999999999];
       // output.value+="x:"+x+" y:"+y+"\n";
    for(m=0;m<cubeVertices.length;m++){
        d=pythagor(x-cubeVertices[m][0],y-cubeVertices[m][1],0);
        if(vertice[1]>d){
         vertice[0]=m;
         vertice[1]=d;     
        }
        //output.value+="m:"+m+":"+d+"\n";
    }
   // output.value+=
   // output.value+="Selected vertice:"+vertice[0]+"\n";
    switch(vertice[0]){
        case 0:
            if(y>cubeVertices[vertice[0]][1])
                return [0,1];
            else return[0,3]
        break;
        case 1:
            if(y>cubeVertices[vertice[0]][1])
                return [1,2];
            else return[0,1]
        break;
        case 2:
            if(y>cubeVertices[vertice[0]][1])
                return [2,3];
            else return[1,2]
        break;
        case 3:
            if(y>cubeVertices[vertice[0]][1])
                return [3,0];
            else return[3,2]
        break;    
    }
   // return vertice;
}
/************************************************/    
/*********Collision function **********/
/************************************************/
this.collision=function collision(plane,planeWs,planeHs,mesh,width,height,camera){
/******* Correct mesh rotation *******/
mesh.rotation.z=correctRotation(mesh.rotation.z);
/******* Get cube vertices array *******/    
meshRotationZ=mesh.rotation.z;
getCubeVertices(mesh,width,height);
/******* Calculate plane values  *******/ 
getPlaneValues(plane,planeWs,planeHs);    
/******* get start vertice  *******/ 
startVertice=getStartVertice(plane);        
//output.value+="Start vertice:"+startVertice+"\n";    
/******* bounding box vertice diapozons  *******/     
vXCube=Math.abs(Math.ceil((plane.geometry.vertices[startVertice].x-xmax)/segmentWsize));
vYCube=Math.abs(Math.ceil((plane.geometry.vertices[startVertice].y-ymin)/segmentHsize));
/******* calculate heights for vertices affecting mesh but not inside mesh  *******/      
verticesAffectingMesh= new Array();   
highestZvalue=-9999999999;
checkIfDifferent=0;    
for(j=0;j<vYCube;j++){
    if(j!=0)startVertice+=verticesW;
    for(i=startVertice;i<startVertice+vXCube;i++){ 
        if(verticeInMesh(plane,i)==1){
          //  output.value+="Inside \n";
            verticesAffectingMesh.push([plane.geometry.vertices[i].x,
                                        plane.geometry.vertices[i].y,
                                        plane.geometry.vertices[i].z
                                       ]);
            if(highestZvalue==-9999999999){
                highestZvalue=plane.geometry.vertices[i].z;
            }else if(highestZvalue!=-9999999999 && plane.geometry.vertices[i].z>highestZvalue){
                checkIfDifferent=1;
                highestZvalue=plane.geometry.vertices[i].z;
                //output.value+="Was here \n";
            }
        }else{
          //  output.value+="Outside i:"+i+"\n";
            
            insideVertice=-1;
            outsideVertice=-1;
            type=0;
            if(verticeInMesh(plane,i-1)==1 && plane.geometry.vertices[i].z!=plane.geometry.vertices[i-1].z){
              
                insideVertice=i-1;
                outsideVertice=i; 
                /*output.value+="Outside vertice cooords x:"+plane.geometry.vertices[i].x+
                              " y:"+plane.geometry.vertices[i].y+
                              " z:"+plane.geometry.vertices[i].z+"\n";
                output.value+="Inside vertice cooords x:"+plane.geometry.vertices[i-1].x+
                              " y:"+plane.geometry.vertices[i-1].y+
                              " z:"+plane.geometry.vertices[i-1].z+"\n";
                output.value+="Dummy data -1\n";*/
                
            }else if(verticeInMesh(plane,i+1)==1  && plane.geometry.vertices[i].z!=plane.geometry.vertices[i+1].z){
                insideVertice=i+1;
                outsideVertice=i;  
                 
            }else if(verticeInMesh(plane,i+verticesW)==1  
                     && plane.geometry.vertices[i].z!=plane.geometry.vertices[i+verticesW].z){
                insideVertice=i+verticesW;
                outsideVertice=i;   
            
                type=1;
            }else if(verticeInMesh(plane,i-verticesW)==1  
                     && plane.geometry.vertices[i].z!=plane.geometry.vertices[i-verticesW].z){
                insideVertice=i-verticesW;
                outsideVertice=i;   
              
                type=1;
           
            }
            //output.value+="Inside vertice:"+insideVertice+":"+outsideVertice+"\n";
            if(insideVertice!=-1 && outsideVertice!=-1 && plane.geometry.vertices[insideVertice].z<plane.geometry.vertices[outsideVertice].z){
                cubeV=cubeVerticesNearPoint(plane.geometry.vertices[insideVertice].x,plane.geometry.vertices[insideVertice].y);
                p=lineCrossPoint(
                                     cubeVertices[cubeV[0]][0],
                                     cubeVertices[cubeV[0]][1],
                                     cubeVertices[cubeV[1]][0],
                                     cubeVertices[cubeV[1]][1],
                                     plane.geometry.vertices[insideVertice].x,
                                     plane.geometry.vertices[insideVertice].y,
                                     plane.geometry.vertices[outsideVertice].x,
                                     plane.geometry.vertices[outsideVertice].y);
                
                if(type==0){
                getHeight=lineCrossX(plane.geometry.vertices[insideVertice].x,
                                     plane.geometry.vertices[insideVertice].z,
                                     plane.geometry.vertices[outsideVertice].x,
                                     plane.geometry.vertices[outsideVertice].z,
                                     p[0]);
                      // mesh.position.z=getHeight+3;
                  if(highestZvalue==-9999999999){
                      highestZvalue=getHeight;
                  }else if(highestZvalue!=-9999999999 && getHeight>highestZvalue){
                      checkIfDifferent=1;
                      highestZvalue=getHeight;
                  }
                /*output.value+="inside vertice: "+insideVertice+" outside vertice:"+outsideVertice+"\n";
                output.value+="Outside vertice cooords x:"+plane.geometry.vertices[outsideVertice].x+
                              " y:"+plane.geometry.vertices[outsideVertice].y+
                              " z:"+plane.geometry.vertices[outsideVertice].z+"\n";
                output.value+="Inside vertice cooords x:"+plane.geometry.vertices[insideVertice].x+
                              " y:"+plane.geometry.vertices[insideVertice].y+
                              " z:"+plane.geometry.vertices[insideVertice].z+"\n";
                output.value+="point x:"+p[0]+" y:"+p[1]+"\n";
                output.value+="Dummy data +1+ w\n";
                output.value+="height:"+getHeight+"\n";*/
                }else {
               /* getHeight=lineCrossX(plane.geometry.vertices[insideVertice].y,
                                     plane.geometry.vertices[insideVertice].z,
                                     plane.geometry.vertices[outsideVertice].y,
                                     plane.geometry.vertices[outsideVertice].z,
                                     p[1]);*/
                }
             
            }
                
           // output.value+="Outside \n";
        }
    }//<-- for VxCube end
}//<-- for vYcube end
    
/******* Apply and calculate plane collision  *******/    
  //  output.value+="Highest zvalue:"+highestZvalue+"\n";
    if(highestZvalue==-9999999999)highestZvalue=plane.geometry.vertices[startVertice].z;
  if(checkIfDifferent==0){
   mesh.position.z=highestZvalue+height/2;   
  }else{
   mesh.position.z=highestZvalue+height/2;   
  }
  //   output.value+="******************************************************\n";
    output.scrollTop=output.scrollHeight;
}//<-- collision detection end
 
    
    
    
    
    
    
    
}//<- class end