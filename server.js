
function serverrecieve(fajax)
{
    let method=fajax.method;
    //POST, GET, PUT, and DELETE. These correspond to create, read, update, and delete
    let text="";
      /*
  status + statustext:
  200 ok
  403 forbidden
  404 not found
  */
    let statusnum=404;
    let statustext="not found";
    if(method==="POST"){//add contact
      if(typeof fajax.data === contact){
        database.set(fajax.username, fajax.data);
      statusnum=200;
      statustext="ok";
      }
      if(typeof fajax.data === user){//user sign up
        let check= database.setuser(fajax.data);
        if(check===false){
          statusnum=403;
          statustext="forbidden";
        }
        else{
          statusnum=200;
          statustext="ok";
        }
      }
      else{//data wasn't valid
        statusnum=403;
        statustext="forbidden";
      }
      

    }
    if(method==="GET"){
      if(typeof data === 'number'){//get one
        text= database.get(request.data);
        if(text!=null){
          statusnum=200;
          statustext="ok";

        }
      }
      if(typeof data === user){//get all
        text= database.getall(request.data)
        if(text!=null){
          statusnum=200;
          statustext="ok";
        }
      }
      //add:
      //getby
      //sign in
    }
    if(method==="PUT"){//or patch?
       let check=database.update(request.username, request.data);
       if(check===true){
        statusnum=200;
        statustext="ok";
      }
    }
    if(method==="DELETE"){//or patch?
      let check=database.remove(request.user, request.data);
      if(check===true){
        statusnum=200;
        statustext="ok";
      }
   }
   
    let response={
      responsetext: text,
      status: statusnum,
      message: statustext

    }
    return response;

  /*
things to do:

fix the elses so they will be on both ifs
make sure typeof with a type i created works
add all the rest of the 403 elses
sign in
getby
  
  */  




}



