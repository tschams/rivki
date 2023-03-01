//the contacts are saved in an array in the local storage
//deleted contacts are marked with an id of -1
//current user?
let currentuser=null;//maybe saved in local storage, maybe sent... its an id
function get(id)
{
    let items=JSON.parse(localStorage.getItem(currentuser));
    for (i = 0; i < items.length; i++) { 
        if(items[i].id===id){
            return items[i]
        }
    }
    //if not found...?
}
function getby(key, value)
{
    let items=JSON.parse(localStorage.getItem(currentuser));
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
function getall()
{
    let result=[];
    items= JSON.parse(localStorage.getItem(currentuser));
    for(i=0; i<items.length; i++){
        if(items[i]!=-1){
            result.push(items[i])
        }
    }
    return result;
}
function update(contact)
{
    let items=JSON.parse(localStorage.getItem(currentuser));
    if(items===null){
        //do something? do we have to take care of errors?
    }
    for(i=0; i<items.length; i++){
        if(items[i].id===contact.id){
            items[i]=contact;
        }
    }
    localStorage.removeItem(currentuser);
    localStorage.setItem(currentuser, JSON.stringify(items));
}
function remove(id)
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
    localStorage.removeItem(currentuser);
    localStorage.setItem(currentuser, JSON.stringify(items));
}
function set(item)
{
    let items=JSON.parse(localStorage.getItem(currentuser));
    if(items===null)
    {
        items=[];
    }
    else{
        localStorage.removeItem(currentuser);
    }
    items.push(item);
    localStorage.setItem(currentuser, JSON.stringify(items));
   
}

//do i need a db-api?
//figure out which files need to be connected to html
