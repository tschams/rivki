// import {} from "./FXMLHttpRequest.js";
addEventListener("load", init);
const currentUser = addEventListener("load", getCurrentUser);

// find a way to save the current user from the page of login

// get the current user from the database and use it for all the requests
// in this way, other users can alse use this website 
function getCurrentUser(){
    
    // Create an XMLHttpRequest object
    const xhttp = new FXMLHttpRequest();
    // Define a callback function
    let myUser;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            myUser = JSON.parse(this.responseText);
        }
        else
        if(this.status == 404 || this.status == 403){
            console.log('from getCurrentUser');
            getCurrentUser();
        }
    }

    // Send a request
    let url = '/api/getcurrentuser';
    xhttp.open("GET", url);
    xhttp.send();
    return myUser.name;
}
    
// const currentUser=getCurrentUser();
// const currentUser='aaa';



function init(){
    
    // if(document.getElementById('addContact').style!='null'){
    //     console.log('yes');
    //     document.getElementById('addContact').style.display='none';
    //     document.getElementById('addContact').remove();
    // }
    
    // document.getElementById('showContact').style.display='none';
    // document.getElementById('updateContact').style.display='none';
    var temp = document.querySelector("#home");
    // var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
    console.log("in init");
     // Create an XMLHttpRequest object
     const xhttp = new FXMLHttpRequest();
     // Define a callback function
     xhttp.onreadystatechange = function() {
         if(this.readyState == 4 && this.status == 200){
            let contacts = JSON.parse(this.responseText);
            let element = document.getElementById("myUL");
            for(let i=0; i < contacts.length; i++){
                let listItem = document.createElement("li");
                let node = document.createTextNode(contacts[i].name);
                listItem.appendChild(node);
                //console.log(listItem.textContent);
                listItem.setAttribute("id", contacts[i].id);
                listItem.setAttribute("name", 'contact');
                element.appendChild(listItem);
                element.addEventListener('click', showOneItem);
            }
         }
         else if(this.status == 404 || this.status == 403){
            console.log('from init');
            alert("The action failed.\n Please try again");
         }
     }

     // let currentUser = localStorage.currentUser;
     // Send a request
     let url = "/api/contacts";
     xhttp.open("GET", url, true, currentUser);
     xhttp.send();
    
    //just for checking:
    // let addButton = document.getElementById("myAdd");
    // addButton.addEventListener('click', app.nav);
    // let contacts = [new contact('0501111111', 'Reuven', 'Cohen', 'yi@gmail.com'),
    //                 new contact('0501111111', 'Shimon', 'Levi', 'yi@gmail.com'), 
    //                 new contact('0501111111', 'Levi', 'Yisraeli', 'yi@gmail.com')];

    // let element = document.getElementById("myUL");
    // for(let i=0; i < contacts.length; i++){
    //     let listItem = document.createElement("li");
    //     let node = document.createTextNode(contacts[i].name);
    //     listItem.appendChild(node);
    //     //console.log(listItem.textContent);
    //     listItem.setAttribute("id", contacts[i].id);
    //     listItem.setAttribute("name", 'contact');
    //     element.appendChild(listItem);
    //     element.addEventListener('click', showOneItem);

    //     // element.addEventListener('click', function (event){
    //     //     var idStr = event.target.id;
    //     //     console.log(idStr);
    //     // });
    // }
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


// document.querySelector('.my-anchor-class').addEventListener('click', function(event) {
//     event.preventDefault();
//     let myElement = event.target;
//     while (myElement.tagName !== 'A') {
//       myElement = myElement.parentElement;
//     }
//     console.log(myElement.getAttribute('my-attribute-id'));
  
//   });

function showOneItem(event){
    // var x = document.getElementsByTagName("template");
    // for(let i = 0; i < x.length; i++){
    //     x[i].style.display = 'none';
    //     // if(x[i].style.display === "none"){
    //     //     x[i].style.display = "block";
    //     // }
    //     // else {
    //     //      x[i].style.display = "none";
    //     // }
    //     console.log(x[i]);
    // }

    //document.getElementById('phonebook').style.display='none';

    // document.getElementById('home').style.display='none';
    // document.getElementById('home').remove();
    document.getElementById('phonebook').style.display='none';
    document.getElementById('phonebook').remove();
    var temp = document.querySelector("#show-contact");
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
    var idStr;
    if(!typeof event === String){
        idStr = event.target.id;
    }else{
        idStr = event;
    }
    // Create an XMLHttpRequest object
    const xhttp = new FXMLHttpRequest();
    // Define a callback function
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let myContact = JSON.parse(this.responseText);
            console.log(resp);
            document.getElementById('show_name').innerHTML = myContact.name;
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
    // check if it's ok and how to implement it, maybe to make a get request?
    // let currentUser = localStorage.currentUser;
    // Send a request
    let url = "/api/contacts/" + idStr;
    xhttp.open("GET", url, true, currentUser);
    xhttp.send();

    // let update_b = document.getElementById("myUpdate");
    let update_b = document.querySelector("#myUpdate");
    update_b.addEventListener('click', function (event){
        event.preventDefault();/////??????????
        console.log('in update event');
        var temp = document.getElementsByTagName("template")[3];
        var clon = temp.content.cloneNode(true);
        document.body.appendChild(clon);
        let myContact=new contact('0501111111', 'yisca', 'gabay', 'yi@gmail.com');
        let fn_elem = document.getElementById("update_first_name");
        fn_elem.setAttribute("placeholder", myContact.firstname);
        let ln_elem = document.getElementById("update_last_name");
        ln_elem.setAttribute("placeholder", myContact.lastname);
        let phone_elem = document.getElementById("update_phone");
        phone_elem.setAttribute("placeholder", myContact.phonenumber);
        let mail_elem = document.getElementById("update_mail");
        mail_elem.setAttribute("placeholder", myContact.email);
        let update_button = document.getElementById("update_final");
        update_button.addEventListener('click', function (event){
            let fn = fn_elem.value;
            let ln = ln_elem.value;
            let phone = phone_elem.value;
            let mail = mail_elem.value;
            let updated_contact = {'phonenumber': phone, 'firstname': fn, 'lastname': ln, 'email': mail};
            // update(contactID, updated_contact);
            console.log(updated_contact);
            // Create an XMLHttpRequest object
            const xhttp = new FXMLHttpRequest();
            // Define a callback function
            xhttp.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200){
                    showOneItem(contactID);
                }
                else if(this.readyState == 4 && this.status == 403){
                        alert("Your request is wrong.\n Please try again");
                    }
                    else if(this.status == 404 || this.status == 403){
                        alert("The action failed.\n Please try again");
                    }
            }
            // let currentUser = localStorage.currentUser;
            // Send a request
            let url = '/api/contacts/' + idStr;
            xhttp.open("PUT", url, true, currentUser);
            xhttp.send(updated_contact);
        });
    });

    //for checking:
    // let myContact=new contact('0501111111', 'yisca', 'gabay', 'yi@gmail.com');
 
    // document.getElementById('show_name').innerHTML=myContact.name;
    // document.getElementById('show_phone').innerHTML = myContact.phonenumber;
    // document.getElementById('show_email').innerHTML = myContact.email;
    // let contactID_p = document.getElementsByName("contactID");
    // contactID_p[0].setAttribute("id", myContact.id);
    // console.log(contactID_p);
    // let e=document.getElementById("myUpdate");
    // e.addEventListener("click", handleUpdate);
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
    let contactID = contactID_p[0].getAttribute('id');
    console.log(contactID);
    //let myContact = get(contactID);
    //for checking:
    let myContact=new contact('0501111111', 'yisca', 'gabay', 'yi@gmail.com');
    let fn_elem = document.getElementById("update_first_name");
    fn_elem.setAttribute("placeholder", myContact.firstname);
    let ln_elem = document.getElementById("update_last_name");
    ln_elem.setAttribute("placeholder", myContact.lastname);
    let phone_elem = document.getElementById("update_phone");
    phone_elem.setAttribute("placeholder", myContact.phonenumber);
    let mail_elem = document.getElementById("update_mail");
    mail_elem.setAttribute("placeholder", myContact.email);
    let update_button = document.getElementById("update_final");
    update_button.addEventListener('click', function (event){
        let fn = fn_elem.value;
        let ln = ln_elem.value;
        let phone = phone_elem.value;
        let mail = mail_elem.value;
        let updated_contact = new contact(phone, fn, ln, mail);
        // let updated_contact = {'phonenumber': phone, 'firstname': fn, 'lastname': ln, 'email': mail};
        // update(contactID, updated_contact);
        console.log(updated_contact);
        // Create an XMLHttpRequest object
        const xhttp = new FXMLHttpRequest();
        // Define a callback function
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                showOneItem(contactID);
            }
            else 
                if(this.readyState == 4 && this.status == 403){
                    console.log('from update 403');
                    alert("Your request is wrong.\n Please try again");
                }
                else if(this.status == 404 || this.status == 403){
                    console.log('from update 404');
                    alert("The action failed.\n Please try again");
                }
        }
        // let currentUser = localStorage.currentUser;
        // Send a request
        let url = '/api/contacts/' + idStr;
        xhttp.open("PUT", url, true, currentUser);
        xhttp.send(updated_contact);
        });
    
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
                init();
            }
            else if(this.status == 404 || this.status == 403){
                console.log('from delete');
                alert("The action failed.\n Please try again");
            }
         }
         // check if it's ok and how to implement it, maybe to make a get request?
         // let currentUser = localStorage.currentUser;
         // Send a request
         let url = '/api/contacts/' + contactID;
         xhttp.open("DELETE", url, true, currentUser);
         xhttp.send();
        // return home page
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
           if(this.readyState == 4 && this.status == 200){
               alert("The contact was added successfully");
               //return home
               init();
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
        // let currentUser = localStorage.currentUser;
        // Send a request
        let url = '/api/contacts';
        xhttp.open("POST", url, true, currentUser);
        xhttp.send(new_contact);
    }
    
}

function returnHome(event){

    // var currentP = event.target.id;
    // if(currentP == 'returnHomeFromShow'){
    //     document.getElementById("show-contact").style.display = 'none';
    // }

    // var temp = document.querySelector("#home");
    // // var temp = document.getElementsByTagName("template")[0];
    // var clon = temp.content.cloneNode(true);
    // document.body.appendChild(clon);
    //init();
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

// function showContacts(){
//     // Create an XMLHttpRequest object
//     const xhttp = new XMLHttpRequest();
//     // Define a callback function
//     xhttp.onreadystatechange = function() {
//         alert('111');
//         resp = this.responseText;
//         alert(resp);
//         AmountOfContacts = resp.AmountOfContacts;
//         alert(AmountOfContacts);
//         if (AmountOfContacts) {
//             for (let i = 1; i <= AmountOfContacts; i++) {
//                 resp = JSON.parse(resp);
//                 let contact = resp(`contact$(i)`);
//                 document.getElementById("myUL").innerHTML += <li><a href="#">contact.name</a></li>;
//             }
//         }
//         let contact= {};
//         for (let i = 1; i <= 5; i++) {     
//             contact.name = 'contact ' + i;
//             //document.getElementById("myUL").innerHTML += <li><a href="#">contact.name</a></li>;
//             var node = document.createElement('li');
//             alert('in for 2')
//             node.appendChild(document.createTextNode('1111111'));
//             node.href = '#';
//             document.querySelector('ul').appendChild(node);
//             document.getElementById('myUL').innerHTML = node;
//         }
//     }

//     // Send a request
//     xhttp.open("GET", "ajax_info.txt");
//     xhttp.send();
// }
    


    // ul = document.getElementById("myUL");
    // li = ul.getElementsByTagName("li");
    // for(let i=0; i < contacts.length; i++){
    //     document.getElementById("myUL").innerHTML += <li><a href="#">contacts[i].name</a></li>
    //     // var node = document.createElement('li');
    //     // li[i].getElementsByTagName("a")[0].textContent = contacts[i].name;
    //     // node.appendChild(document.createTextNode(contacts[i].name));
    //     // node.href = '#';
    //     // document.querySelector('ul').appendChild(node);
    //     // document.getElementById('myUL').innerHTML = node;
        
    // }
    // var links = querySelectorAll("myUL");
    // for (var i = 0; i < links.length; i++) {
    //     links[i].addEventListener("click", function(e) {
    //     this.style.color = "#F00";
    //     })
    // }

























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
