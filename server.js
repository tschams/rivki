
function serverrecieve(fajax)
{
    const request = JSON.parse(fajax);//not sure about this, what the format is...
    //POST, GET, PUT, PATCH, and DELETE. These correspond to create, read, update, and delete
    
    if(method==="POST"){
      database.set(request.user, request.text);
       
    }
    if(method==="GET"){
      if(typeof data == 'number'){//get one
        
        //contact person= database.get(request.text);
        //return
      }
      else{//get all
        
        database.getall(request.user)
        //return
      }
      //getby?
    }
    if(method==="PUT"){//or patch?
       database.update(request.user, request.text);
    }
    if(method==="DELETE"){//or patch?
      database.remove(request.user, request.text);
   }
   //and what about signing in?
    //from the data we got build http response and send through network
    //return...

    
}



//