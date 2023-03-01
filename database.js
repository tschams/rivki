//the contacts are saved in an array in the local storage
//deleted contacts are marked with an id of -1

function get(user, id)
{
    let items=JSON.parse(localStorage.getItem(user));
    for (i = 0; i < items.length; i++) { 
        if(items[i].id===id){
            return items[i]
        }
    }
    //if not found...?
}
function getby(user, key, value)
{
    let items=JSON.parse(localStorage.getItem(user));
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
function getall(user)
{
    let result=[];
    items= JSON.parse(localStorage.getItem(user));
    for(i=0; i<items.length; i++){
        if(items[i]!=-1){
            result.push(items[i])
        }
    }
    return result;
}
function update(user, item)
{
    let items=JSON.parse(localStorage.getItem(user));
    if(items===null){
        //do something? do we have to take care of errors?
    }
    for(i=0; i<items.length; i++){
        if(items[i].id===item.id){
            items[i]=item;
        }
    }
    localStorage.removeItem(user);
    localStorage.setItem(user, JSON.stringify(items));
}
function remove(user, id)
{
    let items=JSON.parse(localStorage.getItem("arr"));
    if(items===null){
        //do something? do we have to take care of errors?
    }
    for(i=0; i<items.length; i++){
        if(items[i].id===id){
            items[i].id=-1;//also here might be an error if the item doesnt exist
        }
    }
    localStorage.removeItem(user);
    localStorage.setItem(user, JSON.stringify(items));
}
function set(user, item)
{
    let items=JSON.parse(localStorage.getItem(currentuser));
    if(items===null)
    {
        items=[];
    }
    else{
        localStorage.removeItem(user);
    }
    items.push(item);
    localStorage.setItem(user, JSON.stringify(items));
   
}

//do i need a db-api?
//figure out which files need to be connected to html
