addEventListener("load", init);

// get the current user from the database and use it for all the requests
// in this way, other users can alse use this website 
function getCurrentUser(){
    
    // Create an XMLHttpRequest object
    const xhttp = new FXMLHttpRequest();
    // Define a callback function
    let myUser;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4){
            if(this.status == 200){
                myUser = this.responseText;
            }
            else if(this.status == 404 || this.status == 403){
                console.log('from getCurrentUser');
                getCurrentUser();
            }
        }  
    }

    // Send a request
    let url = '/api/getcurrentuser';
    xhttp.open("GET", url);
    xhttp.send();
    return myUser;
}
    
//const currentUser=getCurrentUser();
const currentUser='yisca';



function init(){

    var temp = document.querySelector("#home");
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
    console.log("in init");
     // Create an XMLHttpRequest object
     const xhttp = new FXMLHttpRequest();
     // Define a callback function
     xhttp.onreadystatechange = function() {
         if(this.readyState == 4){
            if(this.status == 200){
                // let contacts = JSON.parse(this.responseText);
                let contacts = this.responseText;
                let element = document.getElementById("myUL");
                if(contacts!=[]){
                    for(let i=0; i < contacts.length; i++){
                        let listItem = document.createElement("li");
                        let node = document.createTextNode(contacts[i].firstname +" "+ contacts[i].lastname);
                        listItem.appendChild(node);
                        //console.log(listItem.textContent);
                        listItem.setAttribute("id", contacts[i].id);
                        listItem.setAttribute("name", 'contact');
                        element.appendChild(listItem);
                        element.addEventListener('click', showOneItem);
                        
                    }
                }
                
             }
             else if(this.status == 404 || this.status == 403){
                console.log('from init');
                alert("The action failed.\n Please try again");
             }
         } 
        
     }

     let currentUser = getCurrentUser();
     // Send a request
     let url = "/api/contacts";
     xhttp.open("GET", url, true, currentUser);
     xhttp.send();
    
}
 


function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        // a = li[i].getElementsByTagName("a")[0];
        //txtValue = a.textContent || a.innerText;
        txtValue=li[i].textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



function showOneItem(event){

    // document.getElementById('home').style.display='none';
    // document.getElementById('home').remove();
    document.getElementById('phonebook').style.display='none';
    document.getElementById('phonebook').remove();
    var temp = document.querySelector("#show-contact");
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
    var idStr=event.target.id;;

    // Create an XMLHttpRequest object
    const xhttp = new FXMLHttpRequest();
    // Define a callback function
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4){
            if(this.status == 200){
                //let myContact = JSON.parse(this.responseText);
                let myContact = this.responseText;
                document.getElementById('show_name').innerHTML = myContact.firstname+" "+myContact.lastname;
                document.getElementById('show_phone').innerHTML = myContact.phonenumber;
                document.getElementById('show_email').innerHTML = myContact.email;
                let contactID_p = document.getElementsByName("contactID");
                contactID_p[0].setAttribute("id", myContact.id);
                console.log(contactID_p);
            }else if(this.status == 404 || this.status == 403){
                console.log('from showOneItem');
                alert("The action failed.\n Please try again");
            }
        } 
    }
    // check if it's ok and how to implement it, maybe to make a get request?
     let currentUser = getCurrentUser();
    // Send a request
    let url = "/api/contacts/" + idStr;
    xhttp.open("GET", url, true, currentUser);
    xhttp.send();
}


function handleUpdate(ev){
    var x = document.getElementById("showContact");
    x.style.display = "none";
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
    console.log("in handleUpdate");
    var temp = document.getElementsByTagName("template")[3];
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
    let contactID_p = document.getElementsByName("contactID");
    let idStr = contactID_p[0].getAttribute('id');
    console.log(idStr);

    // Create an XMLHttpRequest object
    const xhttp = new FXMLHttpRequest();
    // Define a callback function
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4){
            if(this.status == 200){
                let myContact = this.responseText;
                //let myContact=new contact('0501111111', 'yisca', 'gabay', 'yi@gmail.com');
                let fn_elem = document.getElementById("update_first_name");
                fn_elem.setAttribute("value", myContact.firstname);
                let ln_elem = document.getElementById("update_last_name");
                ln_elem.setAttribute("value", myContact.lastname);
                let phone_elem = document.getElementById("update_phone");
                phone_elem.setAttribute("value", myContact.phonenumber);
                let mail_elem = document.getElementById("update_mail");
                mail_elem.setAttribute("value", myContact.email);
                //let update_button = document.getElementById("update_final");
            }else if(this.status == 404 || this.status == 403){
                console.log('from showOneItem');
                alert("The action failed.\n Please try again");
            }
        } 
    }

    let currentUser = getCurrentUser();
    // Send a request
    let url = "/api/contacts/" + idStr;
    xhttp.open("GET", url, true, currentUser);
    xhttp.send();

    contactID_p[1].setAttribute("id", idStr);
}

function sendForUpdate(ev){
    let contactID_p = document.getElementsByName("contactID");
    let contactID = contactID_p[1].getAttribute('id');
    console.log(contactID);
    let fn_elem = document.getElementById("update_first_name");
    let ln_elem = document.getElementById("update_last_name");
    let phone_elem = document.getElementById("update_phone");
    let mail_elem = document.getElementById("update_mail");

    let fn = fn_elem.value;
    let ln = ln_elem.value;
    let phone = phone_elem.value;
    let mail = mail_elem.value;
    //let updated_contact = new contact(phone, fn, ln, mail);
    let updated_contact = {'phonenumber': phone, 'firstname': fn, 'lastname': ln, 'email': mail};
    // update(contactID, updated_contact);
    console.log(updated_contact);
    // Create an XMLHttpRequest object
    const xhttp = new FXMLHttpRequest();
    // Define a callback function
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4){
            if(this.status == 200){
                alert("The contact was updated successfully!");
                showOneItem(contactID);
            }
            else {
                console.log('from update 404');
                alert("The action failed.\n Please try again");
               }
        }
        
    }
    let currentUser = getCurrentUser();
    // Send a request
    let url = '/api/contacts/' + contactID;
    xhttp.open("PUT", url, true, currentUser);
    xhttp.send(updated_contact);
}

function handleDelete(ev){
    console.log("in handleDelete");
    if(confirm("Are you sure you want to delete this contact?") == true){
        let contactID_p = document.getElementsByName("contactID");
        let contactID = contactID_p[0].getAttribute('id');
        ///send a request for deleting with contactID
        // Create an XMLHttpRequest object
         const xhttp = new FXMLHttpRequest();
         // Define a callback function
         xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                alert("The contact was deleted successfully");
                //return home
                returnHome();
            }
            else if(this.status == 404 || this.status == 403){
                console.log('from delete');
                alert("The action failed.\n Please try again");
            }
         }
         // check if it's ok and how to implement it, maybe to make a get request?
         let currentUser = getCurrentUser();
         // Send a request
         let url = '/api/contacts/' + contactID;
         xhttp.open("DELETE", url, true, currentUser);
         xhttp.send();
    }
}

function sendForAdding(ev){
    let fn_elem = document.getElementById("add_first_name");
    let ln_elem = document.getElementById("add_last_name");
    let phone_elem = document.getElementById("add_phone");
    let mail_elem = document.getElementById("add_mail");
    let fn = fn_elem.value;
    let ln = ln_elem.value;
    let phone = phone_elem.value;
    let mail = mail_elem.value;
    if(fn && ln && phone && mail){
        let new_contact = new contact(phone, fn, ln, mail);
        console.log(new_contact);
        //send request for adding
        // Create an XMLHttpRequest object
        const xhttp = new FXMLHttpRequest();
        // Define a callback function
        xhttp.onreadystatechange = function() {
            console.log("in onreadystatechange in add");
            console.log(this.readyState);
            console.log(this.status);
           if(this.readyState == 4 && this.status == 200){
               alert("The contact was added successfully");
               returnHome();
               //init();
           }
           else 
            if(this.readyState == 4 && this.status == 403){
                console.log('from add 403');
                alert("Your request is wrong.\n Please try again");
            }
            else if(this.status == 404 || this.status == 403){
                console.log('from add 404');
                alert("The action failed.\n Please try again");
            }
        }
        // check if it's ok and how to implement it, maybe to make a get request?
        let currentUser = getCurrentUser();
        // Send a request
        let url = '/api/contacts';
        xhttp.open("POST", url, true, currentUser);
        xhttp.send(new_contact);
    }
    else{
        alert("One or more of the fields are empty")
    }
}

function returnHome(){
    window.location.href="homepage.html";
}

function addContact(ev){
    console.log("in add");
    var x = document.getElementsByTagName("template");
    document.getElementById('phonebook').style.display = 'none';
    var temp = document.querySelector("#add-contact");
    console.log(temp);
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);   
}


// const app = {
//     pages: [],
//     show: new Event('show'),
//     init: function(){
//         app.pages = document.querySelectorAll('.page');
//         app.pages.forEach((pg)=>{
//             pg.addEventListener('show', app.pageShown);
//         })
        
//         document.querySelectorAll('.nav-link').forEach((link)=>{
//             link.addEventListener('click', app.nav);
//         })
//         history.replaceState({}, 'Home', '#home');
//         window.addEventListener('popstate', app.poppin);
//     },
//     nav: function(ev){
//         let elementName=ev.target.getAttribute('name');
//         let currentPage;
//         if(elementName=='contact'){
//             currentPage="show-contact";
//         }
//         // if(elementName=='home'){
//         //     currentPage="home";
//         // }
//         // else{
//         //     if(elementName == 'add'){
//         //         currentPage = "add-contact";
//         //     }
//         else{
//             currentPage = ev.target.getAttribute('data-target');
//         }
//         ev.preventDefault();
//         document.querySelector('.active').classList.remove('active');
//         document.getElementById(currentPage).classList.add('active');
//         console.log(currentPage)
//         history.pushState({}, currentPage, `#${currentPage}`);
//         document.getElementById(currentPage).dispatchEvent(app.show);
//     },
//     // pageShown: function(ev){
//     //     console.log('Page', ev.target.id, 'just shown');
//     //     let h1 = ev.target.querySelector('h1');
//     //     h1.classList.add('big')
//     //     setTimeout((h)=>{
//     //         h.classList.remove('big');
//     //     }, 1200, h1);
//     // },
//     poppin: function(ev){
//         console.log(location.hash, 'popstate event');
//         let hash = location.hash.replace('#' ,'');
//         document.querySelector('.active').classList.remove('active');
//         document.getElementById(hash).classList.add('active');
//         console.log(hash);
//         //history.pushState({}, currentPage, `#${currentPage}`);
//         document.getElementById(hash).dispatchEvent(app.show);
//     }
// }

// document.addEventListener('DOMContentLoaded', app.init);
