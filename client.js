addEventListener("load", init)
addEventListener("load", showContacts)

function init() {
    let AmountOfContacts = 0;
    AmountOfContacts = localStorage.AmountOfContacts;
    
    if (AmountOfContacts) {
        for (let i = 1; i <= AmountOfContacts; i++) {
            let contact = JSON.parse(localStorage.getItem(`contact#${i}`));
        }
    }
    else{
        contact = {};
        contact.name = 'aaa';
        contact.phone = '0501111111';
        contact.email = 'aaa@gmail.com'
        contact = JSON.stringify(contact);
        AmountOfContacts += 1;
        localStorage.setItem(`contact#${AmountOfUsers}`, contact);
        contact = {};
        contact.name = 'bbb';
        contact.phone = '0502222222';
        contact.email = 'bbb@gmail.com'
        contact = JSON.stringify(contact);
        AmountOfContacts += 1;
        localStorage.AmountOfContacts = AmountOfContacts;
    }
}

function showContacts(){
    // Create an XMLHttpRequest object
    const xhttp = new XMLHttpRequest();
    alert('inbbbb')
    // Define a callback function
    xhttp.onload = function() {
        alert('111');
        resp = this.responseText;
        alert(resp);
        AmountOfContacts = resp.AmountOfContacts;
        alert(AmountOfContacts);
        if (AmountOfContacts) {
            for (let i = 1; i <= AmountOfContacts; i++) {
                resp = JSON.parse(resp);
                let contact = resp(`contact$(i)`);
                document.getElementById("myUL").innerHTML += <li><a href="#">contact.name</a></li>;
            }
        }
        let contact= {};
        for (let i = 1; i <= 5; i++) {     
            contact.name = 'contact ' + i;
            //document.getElementById("myUL").innerHTML += <li><a href="#">contact.name</a></li>;
            var node = document.createElement('li');
            alert('in for 2')
            node.appendChild(document.createTextNode('1111111'));
            node.href = '#';
            document.querySelector('ul').appendChild(node);
            document.getElementById('myUL').innerHTML = node;
        }
    }

    // Send a request
    xhttp.open("GET", "ajax_info.txt");
    xhttp.send();
}

function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function showOneItem(){
    let contact = resp(`contact$(i)`);
    document.getElementById('show_name').innerHTML = contact.name;
    document.getElementById('show_phone').innerHTML = contact.phone;
    document.getElementById('show_email').innerHTML = contact.email;
}
