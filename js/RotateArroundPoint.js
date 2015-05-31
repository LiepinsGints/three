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
this.update =function(mesh,Xc,Yc,Zc,angle,radius,axes,centerCheck){

if(centerCheck==1){
if(Xc!=previousCenter[0]||Yc!=previousCenter[1]||Zc!=previousCenter[2]){ 
mesh.position.set( mesh.position.x+(Xc-previousCenter[0]),
                   mesh.position.y+(Yc-previousCenter[1]), 
                   mesh.position.z+(Zc-previousCenter[2]));
}    
previousCenter=[Xc,Yc,Zc];
}
    
    
var coords=quaternion(mesh.position.x,mesh.position.y,mesh.position.z,Xc,Yc,Zc,angle,axes);  
mesh.position.set(coords[0],coords[1],coords[2]);    

}




}//<-- class end