class FXMLHttpRequest {
  constructor(){
    this.onload()=null;
    this.responsetext=null;
   
  }
  open(method, file){
    
    let fajax="";
   
    let ans=request(fajax);

    
  }
  send(){
    if(this.onload!=null){
      this.onload();
    }
  }
  send(info){

  }
   

  }
  /*
  status + statustext:
  200 ok
  403 forbidden
  404 not found
  */

  /* this.readystate=0;
    
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response ready
    //not sure if we need this seems kind of stupid...
    */ 





    class FXMLHttpRequest {
      constructor(){
        this.onload()=null;//function to activate when data is loaded... check how to define template function
        this.responsetext=null;//this will contain the data we return (in string format--needs to be parsed)
       //responseXML  can return data as xml
      }
      open(method, file){//method=GET, POST, PUT, DELETE. file in our case is always database... see if this is needed
        //put is update post is set new item
        let fajax="";
        //could be the following code is in the send function?:
        //creates http request in the right format
        let ans=request(fajax);//check how we have access to the network file
        //disect ans and set responsetext
    
        
      }
      send(){//for get requests according to w3school but why wouldnt you need info to say what you are getting?
        if(this.onload!=null){//prob should just define it as empty function in the constructor
          this.onload();//activates onload function
        }
      }
      send(info){//is id contact, id, key and value...?
    
      }
      //research the following funcs:
      //setRequestHeader()	Adds a label/value pair to the header to be sent
      //xhttp.open("GET", "demo_get2.asp?fname=Henry&lname=Ford");
    
      }
      /*
      status + statustext:
      200 ok
      403 forbidden
      404 not found
      */
    
      /* this.readystate=0;
        
        0: request not initialized
        1: server connection established
        2: request received
        3: processing request
        4: request finished and response ready
        //not sure if we need this seems kind of stupid...
        */ 
    


//ok come back to work on this file...
//before tomorrow