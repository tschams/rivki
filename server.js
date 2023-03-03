
function serverrecieve(fajax)
{
    let method=fajax.method;
    let text="";
    
    let statusnum=404;
    let statustext="not found";
    if(method==="POST"){//add contact
      if(fajax.data instanceof contact){
        database.set(fajax.username, fajax.data);
      statusnum=200;
      statustext="ok";
      }
      else{
        if( fajax.data instanceof user){//user sign up
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
     

    }
    if(method==="GET"){
      if(fajax.data instanceof Number){//get one
        text= database.get(fajax.username, fajax.data);
        if(text!=null){
          statusnum=200;
          statustext="ok";

        }
      
      }
      else{
        if(fajax.data === ""){//get all
          text= database.getall(fajax.username)
          if(text!=null){
            statusnum=200;
            statustext="ok";
          }
        }
        else{
          if(fajax.data instanceof user){//sign in
            text= database.getuser(fajax.data);
              if(text===null){
                statusnum=404;
                statustext="not found";
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
        
      }
      

    }
    if(method==="PUT"){//or patch? 
      if(fajax.data instanceof contact){
       let check=database.update(fajax.username, fajax.data);
       if(check===true){
        statusnum=200;
        statustext="ok";
       }
      }
      else{//data wasn't valid
        statusnum=403;
        statustext="forbidden";
      }
    }
    if(method==="DELETE"){//or patch?
      if(fajax.data instanceof contact){
        let check=database.remove(fajax.user, fajax.data);
        if(check===true){
          statusnum=200;
          statustext="ok";
        }
      }
      else{//data wasn't valid
        statusnum=403;
        statustext="forbidden";
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

readystate 3 pretend its waiting
find out where to stringify
find out if there are two db files
  
  */  




}


  /*
  status + statustext:
  200 ok
  403 forbidden
  404 not found
  */

//POST, GET, PUT, and DELETE. These correspond to create, read, update, and delete


