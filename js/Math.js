/*********************************/
/*******Degress to radian*******/
/*********************************/
function getRadians(degrees){
    return degrees*Math.PI/180;    
}
/*********************************/
/*******radian to degreesn*******/
/*********************************/
function getDegrees(radians){
   return radians*180/Math.PI; 
}
/*******pythagorean theorem*******/
/*********************************/
/*********************************/
function pythagor (a,b,c) {
return Math.sqrt(Math.pow(a,2)+Math.pow(b,2)+Math.pow(c,2));
}
/*********************************/
/*******Object rotation correction*******/
/*********************************/
//361 degrees =>1 degree
function correctRotation(radians){
    deg = getDegrees(radians);
    contains=0;
    if(deg>=0){
    contains=Math.floor(deg/360);
    }else{
    contains=Math.ceil(deg/360);    
    }
    if(contains!=0){
        //deg-=contains*360;
        deg=deg-360*contains;
        return getRadians(deg); 
    }else
        return radians;
       
}


/*********************************/
/*******Normal vector*******/
/*********************************/
function normalVector (x,y,z,distance) {
var coords=[x/distance,y/distance,z/distance];
return coords;
}	
/*********************************/
/*******dot product*******/
/*********************************/
function getDotProduct(x,y,z,x1,y1,z1){
    return x*x1+y*y1+z*z1;   
}
/*********************************/
/*******vector from 2 points*******/
/*********************************/
function getVectorFrom2Points(x,y,z,x1,y1,z1){
  vector=[x1-x,y1-y,z1-z];
    return vector;
    
}
/*****************************************/
/******* point on line x and y 2d*******/
/*****************************************/
function lineCrossX(Ax,Ay,Bx,By,pointX){
   m=(Ay-By)/(Ax-Bx);
   y=m*(pointX-Ax)+Ay; 
   return y;
}
function lineCrossY(Ax,Ay,Bx,By,pointY){
    m=(Ay-By)/(Ax-Bx);
    x=(-pointY+Ay-m*Ax)/m*(-1);
    return x;
}
/*****************************************/
/******* 2d line cross point*******/
/*****************************************/
function lineCrossPoint(Ax,Ay,Ax2,Ay2,Bx,By,Bx2,By2){
    point=[-999999,-999999];
    m1=(Ay-Ay2)/(Ax-Ax2);
    m2=(By-By2)/(Bx-Bx2);
    
    
    if(m1==0 || m2==0){
          if(m1==0 && m2!=0){
              if(Ax-Ax2==0){
                  point=[Ax,lineCrossX(Bx,By,Bx2,By2,Ax)];
                  return point;
              }else if(Ay-Ay2==0){
                  point=[lineCrossY(Bx,By,Bx2,By2,Ay),Ay];
                  return point;
             }
          }
         else if(m1!=0 && m2==0){
              if(Bx-Bx2==0){
                 point=[Ax,lineCrossX(Ax,Ay,Ax2,Ay2,Bx)];
                 return point;
              }else if(By-By2==0){
                  point=[lineCrossY(Ax,Ay,Ax2,Ay2,By),By];
                  return point;
              }
         }     
        else if(m1==0 && m2 ==0){
             if(Ax-Ax2==0 && By-By2==0){
                 point=[Ax,By];
                 return point;
             }
             if(Bx-Bx2==0 && Ay-Ay2==0){
                 point=[Bx,Ay];
                 return point;
             }
        
        }   
    }else if(m1!=0 && m2!=0){
        i1=(m1*(-Ax)+Ay)*(-1);
        i2=(m2*(-Bx)+By);
        x=(i1+i2)/(m1+m2*(-1));
        point=[x,lineCrossX(Ax,Ay,Ax2,Ay2,x)];
        return point;
    }else{
    return [0,0];
    }
}
/*****************************************/
/******* sin value *******/
/*****************************************/
function sinValue(a,c){
    sin=a/c;   
    return sin;
}
/*********************************/
/*******barymetric check if point in triangle*******/
/*********************************/
function inTriangle(Ax,Ay,Az,Bx,By,Bz,Cx,Cy,Cz,Px,Py,Pz){
v0 = getVectorFrom2Points(Ax,Ay,Az,Cx,Cy,Cz);
v1 = getVectorFrom2Points(Ax,Ay,Az,Bx,By,Bz);    
v2 = getVectorFrom2Points(Ax,Ay,Az,Px,Py,Pz);

dot00 = getDotProduct(v0[0],v0[1],v0[2],v0[0],v0[1],v0[2]);
dot01 = getDotProduct(v0[0],v0[1],v0[2],v1[0],v1[1],v1[2]);
dot02 = getDotProduct(v0[0],v0[1],v0[2],v2[0],v2[1],v2[2]);
dot11 = getDotProduct(v1[0],v1[1],v1[2],v1[0],v1[1],v1[2]);
dot12 = getDotProduct(v1[0],v1[1],v1[2],v2[0],v2[1],v2[2]);

// Compute barycentric coordinates
invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
u = (dot11 * dot02 - dot01 * dot12) * invDenom;
v = (dot00 * dot12 - dot01 * dot02) * invDenom;

// Check if point is in triangle
if((u >= 0) && (v >= 0) && (u + v < 1))
return 1;
else
return 0;
 
}


/*********************************/
/*******Quaternion multiplication*******/
/*********************************/
function QuatMulti(w1,i1,j1,k1,w2,i2,j2,k2) {
	w=(w1*w2)-(i1*i2)-(j1*j2)-(k1*k2);
	x=(w1*i2)+(i1*w2)+(j1*k2)-(k1*j2);
	y=(w1*j2)+(j1*w2)+(k1*i2)-(i1*k2);
	z=(w1*k2)+(k1*w2)+(i1*j2)-(j1*i2);
	var quat=[w,x,y,z];
	return quat;
}


/*********************************/
/*******quaternion function*******/
/*********************************/
/*
x,y,z - rotating object coords
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
function quaternion(x,y,z,Xc,Yc,Zc,angle,axes){
//quat calculation
if(angle!=0){    
var sinAngle=Math.sin((angle/2) * (Math.PI/180));
var cosAngle=Math.cos((angle/2) * (Math.PI/180));
var qi,qj,qk;   
switch(axes){
case 0:
qi= sinAngle;
qj= 0;
qk= 0;

break;
case 1:
qi= 0;
qj= sinAngle;
qk= 0;

break;
case 2:
qi= 0;
qj= 0;
qk=sinAngle;

break;
default:

break;

}
    
var s1=QuatMulti(cosAngle,-qi,-qj,-qk,0,x-Xc,y-Yc,z-Zc);
var s2=QuatMulti(s1[0],s1[1],s1[2],s1[3],cosAngle,qi,qj,qk);
coords=[s2[1]+Xc,s2[2]+Yc,s2[3]+Zc];
    return coords;
}else return [x,y,z];
}

