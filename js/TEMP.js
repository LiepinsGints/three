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
    //
/******* Apply and calculate plane collision  *******/    
  //  output.value+="Highest zvalue:"+highestZvalue+"\n";
    if(typeof highestZvalue === 'undefined'){
     output.value+="Highest value incorrect \n";
    alert("????????????");
 }else{
 if(highestZvalue==-9999999999)highestZvalue=plane.geometry.vertices[startVertice].z;
  if(checkIfDifferent==0){
   mesh.position.z=highestZvalue+height/2;   
  }else{
   mesh.position.z=highestZvalue+height/2;   
  }
 }
  //   output.value+="******************************************************\n";
    output.scrollTop=output.scrollHeight;