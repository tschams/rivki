//import {request} from "./network";

class FXMLHttpRequest {
  
  constructor(){
    this.onreadystatechange=()=>{};
    this.readystate=0;//request not initialized
  }
  
  open(method, url, async=true, username="", password = ""){
    //the methods are POST, GET, PUT, and DELETE and they correspond to create, read, update, and delete:
    this.method=method;
    //the url contains the specific kind of request we are making:
    this.url=url;
    this.async=async;
    //username and password tell us who the current user making the request is
    this.username=username;
    this.password = password;
    this.readystate=1;//server connection established
    this.onreadystatechange();
    
  }
  send(data=null){
    
    this.data=data;
    this.readyState=2;//request received
    this.onreadystatechange();
    let response = request(this);//send through the network
    this.readyState=3;//processing request
    this.onreadystatechange();
    this.responseText=response.responsetext;
    this.status=response.status;
    this.message=response.message;
    this.readyState=4;//request finished and response ready
    this.onreadystatechange();
  }
   

  }

 







    
      
