function ConsoleCommands(){
//declare console input and output fields	
var input=document.getElementById('inputConsole');	
var output=document.getElementById('outputConsole');
//
var inputValue = input.value;
input.value="";
output.value+="command: "+inputValue+"\n"; 
output.scrollTop=output.scrollHeight;
readCommand(inputValue);

//Explode string
function explodeString(string,seperator){
var result = string.split(seperator);	
return result;
}
//Read and execute command
function readCommand(inputValue){

var explodedCommand = explodeString(inputValue," ");
if(explodedCommand.length!=0){
	
	//alert("Explode lenght: "+explodedCommand.length);
	switch(explodedCommand.length){
		case 1:
			if(explodedCommand[0].toLowerCase()=="clear"){
			  output.value="";	
			}else if(explodedCommand[0].toLowerCase()=="help"){
			  output.value+=
		      "console: clear - clears output console \n"+
              "console: teleport x y z - teleport player \n"+      
		  	  "---end of command help --- \n";	
			}else{
		      output.value+="console:Incorrect command.. type 'help' for info.\n";	
			}
		break;
		case 2:
		
		break;
		case 3:
		
		break;
        case 4:
		    if(explodedCommand[0].toLowerCase()=="teleport" || explodedCommand[0].toLowerCase()=="tele"){
                output.value+="Teleporting... \n";
                if(isNaN(explodedCommand[1])==false && isNaN(explodedCommand[2])==false && isNaN(explodedCommand[3])==false){
                   
                   xp=Number(explodedCommand[1]);
                   yp=Number(explodedCommand[2]);
                   zp=Number(explodedCommand[3]);  
                    meshMove.teleport(xp,yp,zp); 
                }
            }
		
		break;
		case 5:
			if(explodedCommand[0].toLowerCase()=="spawn"){			
				if(explodedCommand[1].toLowerCase()=="sphera"){
					spawns.createSphera(Number(explodedCommand[2]), 
										Number(explodedCommand[3]), 
										Number(explodedCommand[4]),
										5,
										32,
										32,
										0xba1a1a,
										scene);
				}				
			}else{
		      output.value+="console:Incorrect command.. type 'help' for info.\n";	
			}
		break;
		case 6:
		
		break;
		case 7:
		
		break;
		case 8:
		
		break;
		case 9:
			if(explodedCommand[0].toLowerCase()=="spawn"){	
			//alert("in spawn");
				if(explodedCommand[1].toLowerCase()=="sphera"){
					spawns.createSphera(Number(explodedCommand[2]), 
										Number(explodedCommand[3]), 
										Number(explodedCommand[4]),
										Number(explodedCommand[5]),
										Number(explodedCommand[6]),
										Number(explodedCommand[7]),
										Number(explodedCommand[8]),
										scene);
				}
				if(explodedCommand[1].toLowerCase()=="light"){
					//alert("light");
						if(explodedCommand[2].toLowerCase()=="point"){
							spawns.createlightPoint(Number(explodedCommand[3]), 
										Number(explodedCommand[4]), 
										Number(explodedCommand[5]),
										Number(explodedCommand[6]),
										Number(explodedCommand[7]),
										Number(explodedCommand[8]),
										scene);
						}
				}
				
			}
			else{
		      output.value+="console:Incorrect command.. type 'help' for info.\n";	
			}
		break;
		
		case 10:
	
		break;
		default:
			output.value+="|console:Incorrect command.. type 'help' for info.\n";	
		break;
		
		
		
	}
	
	
	

	
}//if lenght !=0 end


}//<-- read command end



}//Function end