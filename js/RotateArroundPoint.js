// JavaScript Document
function RotateArroundPoint(Xo,Yo,Xc,Yc,angle){
/*********************************/
/*******Variables*******/
/*********************************/
var radius=0;
var angleSin=0;
var a = Math.abs(Xo-Xc);
var b = Math.abs(Yo-Yc);
var quad = getQuad(Xo,Yo,Xc,Yc);
//document.getElementById("Angle").innerHTML=":( sin:"+angleSin+" radius:"+radius+" quad:"+quad;
//document.getElementById("Angle").innerHTML="a:"+a+ "b:"+b+" quad:"+quad;
if(quad==1 || quad==3){
  radius= pythagor(a,b);
  angleSin=Math.asin(a/radius)* (180 / Math.PI);
  
  quad= correctQuad(angleSin,angle,quad); 
}
if(quad==2 || quad==4){
   radius= pythagor(a,b);
   angleSin=Math.asin(b/radius)* (180 / Math.PI);
   
   //document.getElementById("Angle").innerHTML=":)";
   quad= correctQuad(angleSin,angle,quad);
   document.getElementById("Angle").innerHTML=":) sin:"+angleSin+" radius:"+radius+" quad:"+quad;
}
if(quad==5){
	radius=b;
}
if(quad==6){
	radius=a;
}
// document.getElementById("Angle").innerHTML="angle"+angle+angleSin;
if(quad==0)return(coords=[Xc,Yc]);
else
return (coords (angle+angleSin,radius,quad,Xo,Yo,Xc,Yc));
/*********************************/
/*******pythagorean theorem*******/
/*********************************/
function pythagor (_a,_b) {
return Math.sqrt(Math.pow(_a,2)+Math.pow(_b,2));
}	
/*********************************/
/*******quad detection*******/
/*********************************/
function getQuad(Xo,Yo,Xc,Yc) {
//<-- quad 1
if(Xo>Xc && Yo>Yc){
	return 1;
}
//<-- quad 2
else if(Xo>Xc && Yo<Yc){
	return 2;
}
//<-- quad 3
else if(Xo<Xc && Yo<Yc){
    return 3;
}
//<-- quad 4
else if(Xo<Xc && Yo>Yc){
    return 4;
}
else if(Xo==Xc){
	return 5;	
}
else if(Yo==Yc){
	return 6;
}
else return 0;
}//<--	
/*********************************/
/*******Calculate correct quad*******/
/*********************************/
function correctQuad (angle,angleIncrement,quad) {
  var quadRot=Math.floor((angle+angleIncrement)/90);
  if(quadRot==0)return quad;
  else if(quadRot>0){
	  var quads=quadRot+quad;
	  return(quads-(Math.floor(quads/4)*4));
  }
  else {}
}	
/*********************************/
/*******get new coords*******/
/*********************************/
function coords (angle,radius,quad,Xo,Yo,Xc,Yc) {
   if(quad==1 || quad==3){
       var ac = Math.round(Math.sin(angle * (Math.PI/180))*radius);
	   var bc = Math.round(Math.cos(angle * (Math.PI/180))*radius);
	   var incX=Xo/Math.abs(Xo);
	   var incY=Yo/Math.abs(Yo);
	   if(incX==0 || Xo==0)incX=1;
	   if(incY==0 || Yo==0)incY=1;
	   var coords=[ac*incX,bc*incY];
	   return coords;
	
   } 
       if(quad==2 || quad==4){
       var ac = Math.round(Math.cos(angle * (Math.PI/180))*radius);
	   var bc = Math.round(Math.sin(angle * (Math.PI/180))*radius);
	   var incX=Xo/Math.abs(Xo);
	   var incY=Yo/Math.abs(Yo);
	   if(incX==0 || Xo==0)incX=1;
	   if(incY==0 || Yo==0)incY=1;
	   var coords=[ac*incX,bc*incY];
	   return coords;
   }  
      if(quad==5){
       var ac = Math.round(Math.sin(angle * (Math.PI/180))*radius);
	   var bc = Math.round(Math.cos(angle * (Math.PI/180))*radius);
	   var incX=Xo/Math.abs(Xo);
	   var incY=Yo/Math.abs(Yo);
	   if(incX==0 || Xo==0)incX=1;
	   if(incY==0 || Yo==0)incY=1;
	   var coords=[ac*incX,bc*incY];	   
	   return coords;
   }
       if(quad==6){
       var ac = Math.round(Math.cos(angle * (Math.PI/180))*radius);
	   var bc = Math.round(Math.sin(angle * (Math.PI/180))*radius);
       var incX=Xo/Math.abs(Xo);
	   var incY=Yo/Math.abs(Yo);
	   if(incX==0 || Xo==0)incX=1;
	   if(incY==0 || Yo==0)incY=1;
	   var coords=[ac*incX,bc*incY];
	 //  document.getElementById("Angle").innerHTML="angle"+angle+"X"+Xo+ "Y"+incY;
	  return coords;
   }else return (coords=[Xc,Yc]);

}
}//<-- class end