//the contacts are saved in an array in the local storage
function get(id)
{
    return localStorage.getItem(id);
}
function getby(key, value)
{
    let list=[]
    for (i = 0; i < localStorage.length; i++) {
        let x = localStorage.key(i);
        if(x.value instanceof person)
        {
            item = JSON.parse(x.value);
            if(item.key===value)//i think this is wrong
                 {list.push(item.value)}
        }
      }
      return list;
}
function getall()
{
    let list=[]
    for (i = 0; i < localStorage.length; i++) {
        let item = localStorage.key(i);
        if(item.value instanceof person)
            {list.push(JSON.parse(item.value))}
      }
    return list;
}
function update(id, key, value)//id, key of what to update, new value
{
    x=localStorage.getItem(id);
    item=JSON.parse(item);
    item.vaue.key=value;//i think this is wrong
    val=JSON.stringify(item)
    localStorage.removeItem(id);
    localStorage.setItem(id, val);
}
//all obove this line need to change them to make it an array
function remove(id)
{
    let items=JSON.parse(localStorage.getItem("arr"));//check in proj 2 if this is how you check
    if(items===null){
        //do something? do we have to take care of errors?
    }
    for(i=0; i<items.length; i++){
        if(items[i].id===id){
            delete items[i];//also here might be an error if the item doesnt exist
        }
    }
    localStorage.removeItem("arr");
    val=JSON.stringify(items)//make sure you need to stringify arrays?
    localStorage.setItem("arr", val);
}
function set(item)
{
    let items=JSON.parse(localStorage.getItem("arr"));//check in proj 2 if this is how you check
    if(items===null)
    {
        items=[];
    }
    else{
        localStorage.removeItem("arr");
    }
    items.push(item);
    val=JSON.stringify(items)//make sure you need to stringify arrays?
    localStorage.setItem("arr", val);
   
}
//check if .value is the right way to retrieve items
