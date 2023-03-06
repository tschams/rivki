const users = [];
let userName;
let password;

addEventListener("click", handleClick);

//Change between divs in same place. 
function switchVisible() {
    if (document.getElementById('containerLogIn')) {
        if (document.getElementById('containerLogIn').style.display == 'none') {
            document.getElementById('containerLogIn').style.display = 'block';
            document.getElementById('containerSignIn').style.display = 'none';
        }
        else {
            document.getElementById('containerLogIn').style.display = 'none';
            document.getElementById('containerSignIn').style.display = 'block';
        }
    }
}

function switchVisible1() {
    if (document.getElementById('containerLogIn')) {
        if (document.getElementById('containerLogIn').style.display == 'none') {
            document.getElementById('containerLogIn').style.display = 'block';
            document.getElementById('containerForgot').style.display = 'none';
        }
        else {
            document.getElementById('containerLogIn').style.display = 'none';
            document.getElementById('containerForgot').style.display = 'block';
        }
    }
}

function handleClick(event) {
    if (event == undefined) {
        throw "Invalid Argument";
    }
    if (event.defaultPrevented) {
        throw "Event prevented";
    }
    var idStr = event.target.id;

    //Switches between the divs displayed on the screen
    if (idStr == "newPassword") {
        switchVisible1();
    }

    //For an existing user
    if (idStr == "logIn") {
        userName = document.getElementById('nameLogIn').value;
        password = document.getElementById('passwordLogIn').value;
        let user_in = new user(password, userName);
        if (userName == '' || password == '') {
            document.getElementById("message").innerHTML = 'One or more of the fields are empty';
            setTimeout(function () {
                document.getElementById("message").innerHTML = "";
            }, 5000);
            return;
        }
        // Create an XMLHttpRequest object
        const xhttp = new FXMLHttpRequest();
        // Define a callback function
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4){
                if (this.status == 200){
                    console.log('in login 200 ok');
                    // open("homepage.html");
                    // window.top.close();
                    console.log(this.responseText);
                    if(this.responseText == user_in.password){
                        enter(user_in);
                    }
                    else{
                        document.getElementById("message").innerHTML = "User name or password are not correct. Try log in again";
                        setTimeout(function () {
                        document.getElementById("message").innerHTML = "";
                    }, 5000);
                    }
                }
                else{
                        // alert("Username or password is incorrect");
                        document.getElementById("message").innerHTML = "User name or password are not correct. Try log in again";
                        setTimeout(function () {
                        document.getElementById("message").innerHTML = "";
                    }, 5000);
                }
            }    
        }
        // Send a request
    let url = '/api/login';
    xhttp.open("GET", url, true, user_in.name, user_in.password);
    xhttp.send();   
    }  


    //For new user
    if (idStr == "signIn") {
        userName = document.getElementById('nameSignIn').value;
        password = document.getElementById('passwordSignIn').value;
        //Make sure there are no empty fields, username contains less than 10 characters, password according to the required format
        if (!checkIsValidInput(userName, password)) {
            switchVisible();
            return;
        }
        let newUser = new user(password, userName);
        // Create an XMLHttpRequest object
        const xhttp = new FXMLHttpRequest();
        // Define a callback function
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4){
            if(this.status == 200){
              // open("homepage.html");
              // window.top.close();
              console.log(this.responseText);
              alert("Congratulations!!!\nYou have successfully registered.")
              enter(newUser);
          }
          else{
            if(this.status == 404){
              alert("The page was not found");
            }else {
              // alert("Username or password is already taken.\n Please choose another one");
                switchVisible();
                document.getElementById("message").innerHTML = `'${userName}' user name is already taken`;
                setTimeout(function () {
                    document.getElementById("message").innerHTML = "";
                }, 5000);
            }
          }
        }
    }
        
        // Send a request
        let url = '/api/signup';
        xhttp.open("POST", url, true, userName, password);
        xhttp.send(newUser);
}
}


function enter(user){
    // before you enter to the naxt page, save the cuurrent user
    // for internal use
  
    // Create an XMLHttpRequest object
      const xhttp = new FXMLHttpRequest();
      // Define a callback function
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4){
          if (this.status == 200){
          window.location.href="homepage.html";
      }
      else{
        enter(user);
      }
        }
        
     }
      
      // Send a request
    let url = '/api/setcurrentuser';
    xhttp.open("POST", url, true, user.name);
    xhttp.send(user.name);
  }


//Make sure there are no empty fields, username contains less than 10 characters, password according to the required format
function checkIsValidInput(user, pass) {
    if (user == '' || pass == '') {
        document.getElementById("message").innerHTML = 'One or more of the fields are empty';
        setTimeout(function () {
            document.getElementById("message").innerHTML = "";
        }, 5000);
        return false;
    }
    if (user.length > 10) {
        document.getElementById("message").innerHTML = 'User name is too long, it should be less than 10 characters.';
        setTimeout(function () {
            document.getElementById("message").innerHTML = "";
        }, 5000);
        return false;
    }
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,10}$/;
    if (!re.test(pass)) {
        document.getElementById("message").innerHTML = 'The password must contain 8-10 chracters in this format: <br/>lowercase letters, uppercase letters, numbers and a special character';
        setTimeout(function () {
            document.getElementById("message").innerHTML = "";
        }, 5000);
        return false;
    }
    return true;
}