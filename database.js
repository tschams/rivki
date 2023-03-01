//the contacts are saved in an array in the local storage
//deleted contacts are marked with an id of -1
function get(id)
{
    let items=JSON.parse(localStorage.getItem("arr"));
    for (i = 0; i < items.length; i++) { 
        if(items[i].id===id){
            return items[i]
        }
    }
    //if not found...?
}
function getby(key, value)
{
    let items=JSON.parse(localStorage.getItem("arr"));
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
        }
        
      }
      return result;
}
function getall()
{
    let result=[];
    items= JSON.parse(localStorage.getItem("arr"));
    for(i=0; i<items.length; i++){
        if(items[i]!=-1){
            result.push(items[i])
        }
    }
    return result;
}
function update(id, key, value)
{
    let items=JSON.parse(localStorage.getItem("arr"));
    if(items===null){
        //do something? do we have to take care of errors?
    }
    for(i=0; i<items.length; i++){
        if(items[i].id===id){
            if(key===number){//maybe think how to make this general and specific to our project
                items[i].number=value;
            }
            if(key===firstname){
                items[i].firstname=value;
            }
            if(key===lastname){
                items[i].lastname=value;
            }
        }
    }
    localStorage.removeItem("arr");
    localStorage.setItem("arr", JSON.stringify(items));
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
    localStorage.removeItem("arr");
    localStorage.setItem("arr", JSON.stringify(items));
}
function set(item)
{
    let items=JSON.parse(localStorage.getItem("arr"));
    if(items===null)
    {
        items=[];
    }
    else{
        localStorage.removeItem("arr");
    }
    items.push(item);
    localStorage.setItem("arr", JSON.stringify(items));
   
}

//do i need a db-api?
//figure out which files need to be connected to html
