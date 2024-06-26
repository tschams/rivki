class server {
	serverrecieve(fajax) {
		let text = '';
		let statusnum = 404;
		let statustext = 'not found';
		let url = fajax.url.replace('/api/', '');
		let dealt = false; //we have not yet dealt with the request
		if (fajax.method === 'POST') {
			if (url == 'todos') {
				//add todo
				set(fajax.username, fajax.data);
				statusnum = 200;
				statustext = 'ok';
				dealt = true;
			}
			if (url == 'signup') {
				//user sign up
				dealt = true;
				let check = setuser(fajax.data);
				if (check === false) {
					statusnum = 403;
					statustext = 'forbidden';
				} else {
					statusnum = 200;
					statustext = 'ok';
				}
			}
			if (url == 'setcurrentuser') {
				dealt = true;
				setcurrentuser(fajax.username);
				statusnum = 200;
				statustext = 'ok';
			}
		}
		if (fajax.method === 'GET') {
			console.log(url);
			let id = url.replace('todos/', '');
			console.log(id);
			if (url.startsWith('todos/') && !isNaN(parseFloat(id))) {
				//get one todo
				dealt = true;
				text = get(fajax.username, id);
				console.log('text: ' + text);
				if (text != null) {
					statusnum = 200;
					statustext = 'ok';
				}
			}
			if (url === 'todos') {
				//get all todos
				dealt = true;
				text = getall(fajax.username);
				console.log('text: ' + text);
				if (text != null) {
					statusnum = 200;
					statustext = 'ok';
				}
			}
			if (url == 'getcurrentuser') {
				dealt = true;
				text = getcurrentuser();
				if (text != null) {
					statusnum = 200;
					statustext = 'ok';
				}
			}
			if (url == 'login') {
				//sign in
				dealt = true;
				text = getuser(fajax.username);
				if (text === null) {
					statusnum = 404;
					statustext = 'not found';
				} else {
					statusnum = 200;
					statustext = 'ok';
				}
			}
		}
		if (fajax.method === 'PUT') {
			let id = url.replace('todos/', '');
			console.log(id);
			if (url.startsWith('todos/') && !isNaN(parseFloat(id))) {
				//update
				dealt = true;
				let check = update(fajax.username, id, fajax.data);
				if (check === true) {
					statusnum = 200;
					statustext = 'ok';
				}
			}
		}
		if (fajax.method === 'DELETE') {
			let id = url.replace('todos/', '');
			console.log(id);
			if (url.startsWith('todos/') && !isNaN(parseFloat(id))) {
				//delete
				dealt = true;
				let check = remove(fajax.username, id);
				if (check === true) {
					statusnum = 200;
					statustext = 'ok';
				}
			}
		}
		if (dealt === false) {
			//if the request did not match any of the actions the server can perform, it means something was wrong with the request
			statusnum = 403;
			statustext = 'forbidden';
		}
		let response = {
			responsetext: text,
			status: statusnum,
			message: statustext,
		};
		return response;
	}
	/*
    status + statustext:
    200 ok
    403 forbidden
    404 not found
    */
}

// function serverrecieve(fajax)
// {

//   let text="";
//   let statusnum=404;
//   let statustext="not found";
//   let url = fajax.url.replace("/api/", "");
//   let dealt=false;//we have not yet dealt with the request
//   if(fajax.method==="POST"){
//     if(url == 'todos'){//add todo
//       set(fajax.username, fajax.data);
//       statusnum=200;
//       statustext="ok";
//       dealt=true;
//     }
//     if(url == 'signup'){//user sign up
//       dealt=true;
//       let check= setuser(fajax.data);
//       if(check===false){
//         statusnum=403;
//         statustext="forbidden";
//       }
//       else{
//         statusnum=200;
//         statustext="ok";
//       }
//     }
//     if(url == "setcurrentuser"){
//       dealt=true;
//       setcurrentuser(fajax.username);
//       statusnum=200;
//       statustext="ok";
//     }
//   }
//   if(fajax.method==="GET"){
//     console.log(url);
//     let id = url.replace("todos/", "");
//     console.log(id);
//     if(url.startsWith("todos/") && !isNaN(parseFloat(id))){//get one todo
//       dealt=true;
//       text= get(fajax.username, id);
//       console.log("text: " + text);
//       if(text!=null){
//         statusnum=200;
//         statustext="ok";
//       }
//     }
//     if(url === "todos"){//get all todos
//       dealt=true;
//       text= getall(fajax.username);
//       console.log("text: " + text);
//       if(text!=null){
//         statusnum=200;
//         statustext="ok";
//       }
//     }
//     if(url == "getcurrentuser"){
//       dealt=true;
//       text=getcurrentuser();
//       if(text!=null){
//         statusnum=200;
//         statustext="ok";
//       }
//     }
//     if(url == "login"){//sign in
//       dealt=true;
//       text= getuser(fajax.username);
//         if(text===null){
//           statusnum=404;
//           statustext="not found";
//         }
//         else{
//           statusnum=200;
//           statustext="ok";
//         }
//       }
//   }
//   if(fajax.method==="PUT"){
//     let id = url.replace("todos/", "");
//     console.log(id);
//     if(url.startsWith("todos/") && !isNaN(parseFloat(id))){//update
//       dealt=true;
//       let check=update(fajax.username, id, fajax.data);
//       if(check===true){
//       statusnum=200;
//       statustext="ok";
//       }
//     }
//   }
//   if(fajax.method==="DELETE"){
//     let id = url.replace("todos/", "");
//     console.log(id);
//     if(url.startsWith("todos/") && !isNaN(parseFloat(id))){//delete
//         dealt=true;
//         let check=remove(fajax.username, id);
//         if(check===true){
//         statusnum=200;
//         statustext="ok";
//         }

//     }
//   }
//   if(dealt===false){//if the request did not match any of the actions the server can perform, it means something was wrong with the request
//     statusnum=403;
//     statustext="forbidden";
//   }
//   let response={
//     responsetext: text,
//     status: statusnum,
//     message: statustext

//   }
//   return response;

// }
//   /*
//   status + statustext:
//   200 ok
//   403 forbidden
//   404 not found
//   */
