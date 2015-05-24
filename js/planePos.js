// JavaScript Document
//insert after three js
function PlanePos(){


this.getSegment=function getSegment (planeW, planeH, planeWs, planeHs,coordX, coordY) {
//<-- cordinate diapazons

this.DiapX=planeW/2;
this.DiapY=planeH/2;
//<-- 
if((coordX>=-1*this.DiapX && coordX<this.DiapX)&& (coordY>=-1*this.DiapY && coordY<this.DiapY)){
this.DiapX=this.DiapX+coordX;
this.DiapY=this.DiapY-+coordY;

//<-- segment dimanesions
this.SegmentWidth=planeW/planeWs;
this.SegmentHeight=planeH/planeHs;
//<--
this.SegX=Math.ceil(this.DiapX/this.SegmentWidth);
this.SegY=Math.ceil(this.DiapY/this.SegmentHeight);

//return(this.SegX*planeWs-(planeHs-this.SegY));
return (this.SegY*planeWs-(planeHs-this.SegX));
}
return(0);
}//<--

this.getVertices=function getVertices(planeW, planeH, planeWs, planeHs,coordX, CoordY){
this.segment= this.getSegment (planeW, planeH, planeWs, planeHs,coordX, CoordY);
//<-- first vertice number
return(this.segment+(Math.ceil(this.segment/planeWs)-1)); 	
	
}//<--



	
	
	
	
	
}//<-- plane
