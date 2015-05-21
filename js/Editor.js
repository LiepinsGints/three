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


}