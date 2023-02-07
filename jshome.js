
// Get the modal
var modal = document.getElementById('id01');
var modal2=document.getElementById('id02');
var enter=false;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  
  }
 
}

function login(){

 // f.setAttribute('method',"post");

  let password=document.getElementById("loginpsw").value;
  let user=JSON.parse(localStorage. getItem(password));
  if(user===null){
    alert('incorrect information');
    return false;
  }
  let name=user.username;
  if(name!=document.getElementById("loginname").value){
    alert('incorrect information');
    return false;
   
  }
  if(localStorage. getItem("thisuser")!=null){
    localStorage.removeItem("thisuser");
  }
  localStorage.setItem("thisuser", password);
  if(document.getElementById("entr")===null){
    console.log("mistake");
  }
  return true;
  //document.getElementById("entr").style.visibility="visible";
  
  
  
}
function signup(){
  
  let password=document.getElementById("psw").value;
  let name=document.getElementById("name").value
  if(password!=document.getElementById("pswrpt").value || localStorage.getItem(password)!=null ){
    alert('incorrect information');
   
    return false;
  
  }
  var user={//saved as an object so more information can be added to it later
    username: name 
  };
  localStorage.setItem(password, JSON.stringify(user));
  if(localStorage. getItem("thisuser")!=null){
    localStorage.removeItem("thisuser");
  }
  localStorage.setItem("thisuser", password);
  console.log("saved");
  return true;
  //document.getElementById("entr").style.visibility="visible";

  
  
}

function enter(){
  window.location.href="homepage.html";
}

/*

let Users = new Array();
let i=0;

function User(name, pw) {
  this.uname =name;
  this.pass = pw;
  
}
function login() {

  var userName = document.getElementById('loginname');
  var userPw = document.getElementById('loginpsw').value;

  let arry = JSON.parse(localStorage.getItem("all_users"));

  for (let i = 0; i < arry.length; i++) {

    if (arry[i].uname === userName && arry[i].pass === atob(userPw)) {
      alert('Login successful'); 
      //maybe pop-up saying "welcome"
      window.location.href = "homepage.html"
    }
  }

  {
    alert('Login fail');
  }

 

}
function validateForm() {
  var name1 = document.getElementById('name');
  var pw1 = document.getElementById('psw');
  var pswrpt = document.getElementById("pswrpt");
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

  if (name1.value.length == 0) {
    alert('Please fill in user name');
    return false;

  } else if (pw1.value.length == 0) {
    alert('Please fill in password');
    return false;

  } else if (pswrpt.value.length == 0) {
    alert('Please fill in  repeat password');
    return false;

  } else if (name1.value.length == 0 && pw1.value.length == 0 && pswrpt.value.length == 0) {
    alert('Please fill in user name password and repeat password');
    return false;

  } else if (pw1.value.length > 8) {
    alert('Max of 8');
    return false;

  } else if (!pw1.value.match(numbers)) {
    alert('please add 1 number');
    return false;

  } else if (!pw1.value.match(upperCaseLetters)) {
    alert('please add 1 uppercase letter');
    return false;

  } else if (!pw1.value.match(lowerCaseLetters)) {
    alert('please add 1 lovercase letter');
    return false;

  } else if (pswrpt.value != pw.value) {
    alert('passworded not the same');
    return false;

  }else{
    return true;
  }
  

}
function signup(){
  
var name = document.getElementById('name').value;
var pw = document.getElementById('psw').value;

//var pswrpt =document.getElementById("pswrpt");


//var newUser = new User(name, pw);
let User= {
  uname:name,
  pass:pw
}
 Users[i]=User


 localStorage.setItem('User',JSON.stringify(Users));
 i++
 alert('Your account has been created');
 window.location.href="homepage.html"
}


*/


