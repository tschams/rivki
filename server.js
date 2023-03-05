
function serverrecieve(fajax)
{
    let method=fajax.method;
    let text="";
    
    let statusnum=404;
    let statustext="not found";
    let url = fajax.url.replace("/api/", "");
    if(method==="POST"){//add contact
      if(url == 'contacts'){
        database.set(fajax.username, fajax.data);
        statusnum=200;
        statustext="ok";
      }
      else{
        if(url == 'signup'){//user sign up
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
        else
          if(url == "setcurrentuser"){
            database.setcurrentuser(fajax.username);
            statusnum=200;
            statustext="ok";
          }
            else{//data wasn't valid
              statusnum=403;
              statustext="forbidden";
            }
        
      }
     

    }
    if(method==="GET"){
      if(url.startsWith("contacts/") && url.replace("contacts/", "") instanceof Number){//get one
        text= database.get(fajax.username, fajax.data);
        if(text!=null){
          statusnum=200;
          statustext="ok";

        }
      
      }
      else{
        if(fajax.data === "contacts"){//get all
          text= database.getall(fajax.username)
          if(text!=null){
            statusnum=200;
            statustext="ok";
          }
        }
        else{
          if(url == "getcurrentuser"){
            text=database.getcurrentuser();
            if(text!=null){
              statusnum=200;
              statustext="ok";
            }
          }
          else{
            if(url == "login"){//sign in
              text= database.getuser(fajax.username);
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
      

    }
    if(method==="PUT"){ 
      if(url.startsWith("contacts/") && url.replace("contacts/", "") instanceof Number){
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
    if(method==="DELETE"){
      if(url.startsWith("contacts/") && url.replace("contacts/", "") instanceof Number){
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
  
  */  




}


  /*
  status + statustext:
  200 ok
  403 forbidden
  404 not found
  */

//POST, GET, PUT, and DELETE. These correspond to create, read, update, and delete


