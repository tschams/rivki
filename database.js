//the contacts are saved in an array in the local storage
//deleted contacts are marked with an id of -1

function get(username, id)
{
    let items=JSON.parse(localStorage.getItem(username));
    for (i = 0; i < items.length; i++) { 
        if(items[i].id===id){
            return items[i]
        }
    }
    return null;
}
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
function getall(username)
{
    let result=[];
    items= JSON.parse(localStorage.getItem(username));
    for(i=0; i<items.length; i++){
        if(items[i]!=-1){
            result.push(items[i])
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
    let items=JSON.parse(localStorage.getItem("arr"));
    if(items===null){
        return false;
    }
    let found=false;
    for(i=0; i<items.length; i++){
        if(items[i].id===id){
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
    let items=JSON.parse(localStorage.getItem(user));
    if(items===null)
    {
        items=[];
    }
    else{
        localStorage.removeItem(username);
    }
    items.push(item);
    localStorage.setItem(username, JSON.stringify(items));
   
}
//we will have an array of users
function setuser(user){
    let users=JSON.parse(localStorage.getItem("users"));
    for(i=0; i<users.length; i++){
        if(users[i].password===user.password||users[i].name===user.name){
            return false;
        }
    }
    users.push(user);
    localStorage.removeItem("users");
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}
function getuser(user){
    let users=JSON.parse(localStorage.getItem("users"));
    for(i=0; i<users.length; i++){
        if(users[i].password===user.password && users[i].name===user.name){
            return users[i];
        }
    }
    return null;
}
