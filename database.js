//each user has his contacts saved in an array, with his username as the key
//deleted contacts are marked with an id of -1

function get(username, id)
{
    let items=JSON.parse(localStorage.getItem(username));
    for (i = 0; i < items.length; i++) { 
        if(items[i].id==id){
            return items[i]
        }
    }
    return null;
}
function getall(username)
{
    let result=[];
    let items= JSON.parse(localStorage.getItem(username));
    for(i=0; i<items.length; i++){
        console.log(items[i]);
        if(items[i].id!=-1){
            result.push(items[i]);
        }
    }
    return result;
}
function update(username, item)
{
    let items=JSON.parse(localStorage.getItem(username));
    if(items===null){
        return false;
    }
    let found=false;
    for(i=0; i<items.length; i++){
        if(items[i].id===item.id){
            items[i]=item;
            found=true;
        }
    }
    if(found===false){
        return false;
    }
    localStorage.removeItem(username);
    localStorage.setItem(username, JSON.stringify(items));
    return true;
}
function remove(username, id)
{
    let items=JSON.parse(localStorage.getItem(username));
    if(items===null){
        return false;
    }
    let found=false;
    for(i=0; i<items.length; i++){
        if(items[i].id==id){
            items[i].id=-1;
            found=true;
        }
    }
    if(found===false){
        return false;
    }
    localStorage.removeItem(username);
    localStorage.setItem(username, JSON.stringify(items));
    return true;
}

function set(username, item)
{
    console.log(username);
    let serialContact = localStorage.serialContact;
    if(serialContact){
        serialContact++;
    } 
    else{
        serialContact = 0;
    }
    localStorage.serialContact = serialContact;
    item.id = serialContact;
    let items=JSON.parse(localStorage.getItem(username));
    if(items===null)
    {
        console.log(items);
        items=[];
    }
    else{
        localStorage.removeItem(username);
    }
    items.push(item);
    localStorage.setItem(username, JSON.stringify(items));
   
}
//there is an array of users
function setuser(person){
    let users=JSON.parse(localStorage.getItem("users"));
    if(users==null){
        users=[];
    }
    else{
        localStorage.removeItem("users");
    }
    for(i=0; i<users.length; i++){
        if(users[i].password===person.password||users[i].name===person.name){
            return false;
        }
    }
    users.push(person);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}
function getuser(username){
    let users=JSON.parse(localStorage.getItem("users"));
    for(i=0; i<users.length; i++){
        if(users[i].name===username){
            return users[i].password;
        }
    }
    return null;
}
//the current user is saved in the local storage
function getcurrentuser(){
    return JSON.parse(localStorage.getItem("currentuser"));
}
function setcurrentuser(name){
    localStorage.removeItem("currentuser");
    localStorage.setItem("currentuser", JSON.stringify(name));
}

//this is a function we didn't end up using
function getby(username, key, value)
{
    let items=JSON.parse(localStorage.getItem(username));
    let result=[];
 
    for (i = 0; i < items.length; i++) {
        if(items[i]!=-1){
            if(key===number){//maybe think how to make this general and specific to our project
                if(items[i].number=value){
                    result.push(items[i]);
                }
            }
            if(key===firstname){
                if(items[i].firstname=value){
                    result.push(items[i]);
                }
            }
            if(key===lastname){
                if(items[i].lastname=value){
                    result.push(items[i]);
                }
            }
            if(key===email){
                if(items[i].email=value){
                    result.push(items[i]);
                }
            }
        }
        
      }
      return result;
}

