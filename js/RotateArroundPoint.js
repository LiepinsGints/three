// JavaScript Document
/*
mesh - rotating obeject
Xc,Yc,Zc - center coordinates
Angle - angle increment 
radius- distance between objects
axes (axe rotation):
	 0-x
	 1-y
	 2-z
type=-1 reverse
type= 1 clockwise 

centerCheck
0:disable
1:enable
*/
function RotateArroundPoint(mesh,Xc,Yc,Zc,angle,radius,axes,rotType,centerCheck){
/*********************************/
/*******Variables*******/
/*********************************/
var distance=0;//distance between objects
var previousCenter=[Xc,Yc,Zc];

distance =pointDistance(mesh.position.x-Xc,mesh.position.y-Yc,mesh.position.z-Zc);

if(distance!=radius){
  var normal= normalVector(mesh.position.x,mesh.position.y,mesh.position.z,distance);  
  mesh.position.x=Math.round(normal[0]*radius);
  mesh.position.y=Math.round(normal[1]*radius);
  mesh.position.z=Math.round(normal[2]*radius);  
}
//distance =Math.round(pointDistance(mesh.position.x-Xc,mesh.position.y-Yc,mesh.position.z-Zc));
//alert("Distance: "+distance);
/*******pythagorean theorem*******/
/*********************************/
/*********************************/
function pythagor (a,b) {
return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
}	
/*********************************/
/*******Distance between 3d points*******/
/*********************************/
function pointDistance (x,y,z) {
return Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
}	
/*********************************/
/*******Normal vector*******/
/*********************************/
function normalVector (x,y,z,distance) {
var coords=[x/distance,y/distance,z/distance];
return coords;
}	

/*********************************/
/*******Quaternion multiplication*******/
/*********************************/
this.QuatMulti =function(w1,i1,j1,k1,w2,i2,j2,k2) {
	w=(w1*w2)-(i1*i2)-(j1*j2)-(k1*k2);
	x=(w1*i2)+(i1*w2)+(j1*k2)-(k1*j2);
	y=(w1*j2)+(j1*w2)+(k1*i2)-(i1*k2);
	z=(w1*k2)+(k1*w2)+(i1*j2)-(j1*i2);
	var quat=[w,x,y,z];
	return quat;
}

/*********************************/
/*******change center*******/
/*********************************/
this.changeCenter =function(Xc,Yc,Zc){
previousCenter[0]=Xc;
previousCenter[1]=Yc
previousCenter[2]=Zc
}
/*********************************/
/*******update function*******/
/*********************************/
this.update =function(mesh,Xc,Yc,Zc,angle,radius,axes,rotType,centerCheck){

if(centerCheck==1){
if(Xc!=previousCenter[0]){
mesh.position.x	+=(Xc-previousCenter[0]); 
}
if(Yc!=previousCenter[1]){
mesh.position.y	+=(Yc-previousCenter[1]); 	
}
if(Zc!=previousCenter[2]){
mesh.position.z	+=(Zc-previousCenter[2]); 
}
previousCenter=[Xc,Yc,Zc];
}
//quat calculation
var sinAngle=Math.sin((angle/2) * (Math.PI/180));
var cosAngle=Math.cos((angle/2) * (Math.PI/180));
var qi,qj,qk;
switch(axes){
case 0:
qi= 1  *sinAngle*rotType;
qj= 0  *sinAngle*rotType;
qk= 0  *sinAngle*rotType;

break;
case 1:
qi= 0  *sinAngle*rotType;
qj= 1  *sinAngle*rotType;
qk= 0  *sinAngle*rotType;

break;
case 2:
qi= 0  *sinAngle*rotType;
qj= 0  *sinAngle*rotType;
qk= 1  *sinAngle*rotType;

break;
default:

break;

}
var s1=this.QuatMulti(cosAngle,-qi,-qj,-qk,0,mesh.position.x-Xc,mesh.position.y-Yc,mesh.position.z-Zc);
var s2=this.QuatMulti(s1[0],s1[1],s1[2],s1[3],cosAngle,qi,qj,qk);
mesh.position.set(s2[1]+Xc,s2[2]+Yc,s2[3]+Zc);

/*
var quaternion = new THREE.Quaternion();
quaternion.set ( s2[1], s2[2], s2[3], 1 );
quaternion.normalize();
mesh.setRotationFromQuaternion( quaternion );
*/
//correct mesh rotation

switch(axes){
  case 0:/* 
   if(rotType==1)
   mesh.rotation.x+=-1* Math.PI / 180;
   else if(rotType==-1) {
   camera.rotation.x+=1* Math.PI / 180; 
   }*/
  break;
  case 1: 
  /*
   if(rotType==1)
   mesh.rotation.y+=-1* Math.PI / 180;
   else if(rotType==-1) {
   camera.rotation.y+=1* Math.PI / 180; 
   }*/
  break;
  case 2: /*
   if(rotType==1)
   mesh.rotation.z+=-1* Math.PI / 180;
   else if(rotType==-1) {
   camera.rotation.z+=1* Math.PI / 180; 
   }*/
  break;
}




/*document.getElementById("Angle").innerHTML="cos: "+cosAngle+"qi: "+qi+"qj: "+qj+"qk: "+qk+"</br>";
document.getElementById("Angle").innerHTML+="S1[0]: "+s1[0]+"S1[1]: "+s1[1]+"S1[2]: "+s1[2]+"S1[3]: "+s1[3]+"</br>";
document.getElementById("Angle").innerHTML+="S2[0]: "+s2[0]+"S2[1]: "+s2[1]+"S2[2]: "+s2[2]+"S2[3]: "+s2[3]+"</br>";
 */


/*
distance =pointDistance(mesh.position.x-Xc,mesh.position.y-Yc,mesh.position.z-Zc);

if(distance!=radius){
  var normal= normalVector(mesh.position.x,mesh.position.y,mesh.position.z,distance);  
  mesh.position.x=Math.round(normal[0]*radius);
  mesh.position.y=Math.round(normal[1]*radius);
  mesh.position.z=Math.round(normal[2]*radius);  
}

distance =Math.round(pointDistance(mesh.position.x-Xc,mesh.position.y-Yc,mesh.position.z-Zc));
document.getElementById("Angle").innerHTML="Distance: "+distance;
*/

}
/*
if(distance!=radius){
  mesh.position.x=Math.round(mesh.position.x*(radius/distance));
  mesh.position.y=Math.round(mesh.position.y*(radius/distance));
  mesh.position.z=Math.round(mesh.position.z*(radius/distance));  
}
*/



}//<-- class end