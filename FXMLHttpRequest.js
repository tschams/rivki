//import {request} from "./network";

class FXMLHttpRequest {
  
  constructor(){
    this.onreadystatechange=()=>{};
    this.readystate=0;   
  }
  
  open(method, url, async=true, username="", password = ""){
    
    this.method=method;
    this.url=url;
    this.async=async;
    this.username=username;
    this.password = password;
    this.readystate=1;
    this.onreadystatechange();
    
  }
  send(data=null){
    
    this.data=data;
    this.readyState=2;
    this.onreadystatechange();
    let response = request(this);
    this.readyState=3;//pretend its waiting
    this.onreadystatechange();
    this.responseText=response.responsetext;
    this.status=response.status;
    this.message=response.message;
    this.readyState=4;
    this.onreadystatechange();
  }
   

  }
 


 /* 
    
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response ready
    */ 


//research the following funcs:
//setRequestHeader()	Adds a label/value pair to the header to be sent


 







    
      
