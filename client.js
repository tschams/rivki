addEventListener("load", init)
// addEventListener("load", showContacts)

// function init() {
//     let AmountOfContacts = 0;
//     AmountOfContacts = localStorage.AmountOfContacts;
    
//     if (AmountOfContacts) {
//         for (let i = 1; i <= AmountOfContacts; i++) {
//             let contact = JSON.parse(localStorage.getItem(`contact#${i}`));
//         }
//     }
//     else{
//         contact = {};
//         contact.name = 'aaa';
//         contact.phone = '0501111111';
//         contact.email = 'aaa@gmail.com'
//         contact = JSON.stringify(contact);
//         AmountOfContacts += 1;
//         localStorage.setItem(`contact#${AmountOfUsers}`, contact);
//         contact = {};
//         contact.name = 'bbb';
//         contact.phone = '0502222222';
//         contact.email = 'bbb@gmail.com'
//         contact = JSON.stringify(contact);
//         AmountOfContacts += 1;
//         localStorage.AmountOfContacts = AmountOfContacts;
//     }
// }

// function showContacts(){
//     // Create an XMLHttpRequest object
//     const xhttp = new XMLHttpRequest();
//     alert('inbbbb')
//     // Define a callback function
//     xhttp.onload = function() {
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
    var idStr = event.target.id;
    //let myContact = get(idStr);
    //for checking:
    let myContact=new contact('0501111111', 'yisca', 'gabay', 'yi@gmail.com');

    //document.getElementById('show_name').setAttribute("placeholder", myContact.name); 
    document.getElementById('show_name').innerHTML=myContact.name;
    document.getElementById('show_phone').innerHTML = myContact.phonenumber;
    document.getElementById('show_email').innerHTML = myContact.email;
    let contactID_p = document.getElementsByName("contactID");
    contactID_p[0].setAttribute("id", myContact.id);
    console.log(contactID_p);
    // let e=document.getElementById("myUpdate");
    // e.addEventListener("click", handleUpdate);
}

function handleUpdate(ev){
    var x = document.getElementById("details");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    console.log("in handleUpdate");
    var temp = document.getElementsByTagName("template")[0];
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
        // update(contactID, updated_contact);
        console.log(updated_contact);
        });
}

function handleDelete(ev){
    console.log("in handleDelete");
    let contactID_p = document.getElementsByName("contactID");
    let contactID = contactID_p[0].getAttribute('id');
    ///send a request for deleting with contactID

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
    }
    
}

function returnHome(ev){
    // addButton.addEventListener('click', app.nav);
    window.history.back()
}

// function addContact(ev){
//     var x = document.getElementById("phonebook");
//     if (x.style.display === "none") {
//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//     }
//     console.log("in add");
//     var temp = document.getElementsByTagName("template")[0];
//     var clon = temp.content.cloneNode(true);
//     document.body.appendChild(clon);
// }

function init(){
    console.log("in init");
    //let contacts=database.getall();
    //just for checking:
    let addButton = document.getElementById("myAdd");
    addButton.addEventListener('click', app.nav);
    let contacts = [new contact('0501111111', 'Reuven', 'Cohen', 'yi@gmail.com'),
    new contact('0501111111', 'Shimon', 'Levi', 'yi@gmail.com'), 
    new contact('0501111111', 'Levi', 'Yisraeli', 'yi@gmail.com')];

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
        element.addEventListener('click', app.nav);
        //let a='<a href="#" data-target="show-contact" class="nav-link"></a>';

        // element.addEventListener('click', function (event){
        //     //console.log(event.target);
        //     var idStr = event.target.id;
        //     console.log(idStr);
        // });
    }
        //let a = document.createElement('a');
    //     let name=contacts[i].name;
    //     let a = document.createElement('a');
    //     a.setAttribute('href', '#');
    //     a.setAttribute('data-target',"show-contact");
    //     a.setAttribute('class',"nav-link");
    //     let listItem = document.createElement("li");
    //     let node = document.createTextNode(contacts[i].name);
    //     listItem.appendChild(node);
    //     listItem.appendChild(a);
    //     //a.textContent=name;
    //     // element.innerHTML += a;
    //     // let a = '<li><a href="#"></a></li>';
        
    //     //listItem.appendChild('<a href="#" data-target="show-contact" class="nav-link"></a>');
    //     // listItem.appendChild(a);
    //     // listItem.appendChild(node);
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

}

const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        // app.pages.forEach((pg)=>{
        //     pg.addEventListener('show', app.pageShown);
        // })
        
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        let elementName=ev.target.getAttribute('name');
        let currentPage;
        if(elementName=='contact'){
            currentPage="show-contact";
        }
        // if(elementName=='home'){
        //     currentPage="home";
        // }
        else{
            if(elementName == 'add'){
                currentPage = "add-contact";
            }
            else{
                currentPage = ev.target.getAttribute('data-target');
            }
        }
        ev.preventDefault();
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    // pageShown: function(ev){
    //     console.log('Page', ev.target.id, 'just shown');
    //     let h1 = ev.target.querySelector('h1');
    //     h1.classList.add('big')
    //     setTimeout((h)=>{
    //         h.classList.remove('big');
    //     }, 1200, h1);
    // },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash);
        //history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);
