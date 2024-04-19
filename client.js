addEventListener('load', init);

// get the current user from the database and use it for all the requests
// in this way, other users can alse use this website
function getCurrentUser() {
	// Create an XMLHttpRequest object
	const xhttp = new FXMLHttpRequest();
	// Define a callback function
	let myUser;
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				myUser = this.responseText;
			} else if (this.status == 404 || this.status == 403) {
				console.log('from getCurrentUser');
				getCurrentUser();
			}
		}
	};

	// Send a request
	let url = '/api/getcurrentuser';
	xhttp.open('GET', url);
	xhttp.send();
	return myUser;
}

//const currentUser=getCurrentUser();
const currentUser = 'yisca';

function init() {
	var temp = document.querySelector('#home');
	var clon = temp.content.cloneNode(true);
	document.body.appendChild(clon);
	console.log('in init');
	// Create an XMLHttpRequest object
	const xhttp = new FXMLHttpRequest();
	// Define a callback function
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				// let todos = JSON.parse(this.responseText);
				let todos = this.responseText;
				let element = document.getElementById('myUL');
				if (todos != []) {
					for (let i = 0; i < todos.length; i++) {
						let listItem = document.createElement('li');
						let node = document.createTextNode(todos[i].title);
						listItem.appendChild(node);
						//console.log(listItem.textContent);
						listItem.setAttribute('id', todos[i].id);
						listItem.setAttribute('name', 'todo');
						element.appendChild(listItem);
						element.addEventListener('click', showOneItem);
					}
				}
			} else if (this.status == 404 || this.status == 403) {
				console.log('from init');
				alert('The action failed.\n Please try again');
			}
		}
	};

	let currentUser = getCurrentUser();
	// Send a request
	let url = '/api/todos';
	xhttp.open('GET', url, true, currentUser);
	xhttp.send();
}

function search() {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('mySearch');
	filter = input.value.toUpperCase();
	ul = document.getElementById('myUL');
	li = ul.getElementsByTagName('li');
	for (i = 0; i < li.length; i++) {
		// a = li[i].getElementsByTagName("a")[0];
		//txtValue = a.textContent || a.innerText;
		txtValue = li[i].textContent;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = '';
		} else {
			li[i].style.display = 'none';
		}
	}
}

function showOneItem(event) {
	// document.getElementById('home').style.display='none';
	// document.getElementById('home').remove();
	document.getElementById('todoList').style.display = 'none';
	document.getElementById('todoList').remove();
	var temp = document.querySelector('#show-todo');
	var clon = temp.content.cloneNode(true);
	document.body.appendChild(clon);
	var idStr = event.target.id;

	// Create an XMLHttpRequest object
	const xhttp = new FXMLHttpRequest();
	// Define a callback function
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				//let myTodo = JSON.parse(this.responseText);
				let myTodo = this.responseText;
				document.getElementById('show_title').innerHTML = myTodo.title;
				document.getElementById('show_description').innerHTML =
					myTodo.description;
				let todoID_p = document.getElementsByName('todoId');
				todoID_p[0].setAttribute('id', myTodo.id);
				console.log(todoID_p);
			} else if (this.status == 404 || this.status == 403) {
				console.log('from showOneItem');
				alert('The action failed.\n Please try again');
			}
		}
	};
	// check if it's ok and how to implement it, maybe to make a get request?
	let currentUser = getCurrentUser();
	// Send a request
	let url = '/api/todos/' + idStr;
	xhttp.open('GET', url, true, currentUser);
	xhttp.send();
}

function handleUpdate(ev) {
	var x = document.getElementById('showTodo');
	x.style.display = 'none';
	// if (x.style.display === "none") {
	//     x.style.display = "block";
	// } else {
	//     x.style.display = "none";
	// }
	console.log('in handleUpdate');
	var temp = document.getElementsByTagName('template')[3];
	var clon = temp.content.cloneNode(true);
	document.body.appendChild(clon);
	let todoID_p = document.getElementsByName('todoId');
	let idStr = todoID_p[0].getAttribute('id');
	console.log(idStr);

	// Create an XMLHttpRequest object
	const xhttp = new FXMLHttpRequest();
	// Define a callback function
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				let myTodo = this.responseText;
				console.log('🚀 ~ handleUpdate ~ myTodo:', myTodo);
				//let myTodo=new todo('0501111111', 'yisca', 'gabay', 'yi@gmail.com');
				const title_elem = document.getElementById('update_title');
				title_elem.setAttribute('value', myTodo.title);
				const description_elem = document.getElementById('update_description');
				description_elem.value = myTodo.description;
				//let update_button = document.getElementById("update_final");
			} else if (this.status == 404 || this.status == 403) {
				console.log('from showOneItem');
				alert('The action failed.\n Please try again');
			}
		}
	};

	let currentUser = getCurrentUser();
	// Send a request
	let url = '/api/todos/' + idStr;
	xhttp.open('GET', url, true, currentUser);
	xhttp.send();

	todoID_p[1].setAttribute('id', idStr);
}

function sendForUpdate(ev) {
	let todoID_p = document.getElementsByName('todoId');
	let todoId = todoID_p[1].getAttribute('id');
	console.log(todoId);
	const title = document.getElementById('update_title').value;
	const description = document.getElementById('update_description').value;

	let updated_todo = {
		description,
		title,
	};
	// update(todoId, updated_todo);
	console.log(updated_todo);
	// Create an XMLHttpRequest object
	const xhttp = new FXMLHttpRequest();
	// Define a callback function
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				alert('The todo was updated successfully!');
				showOneItem(todoId);
			} else {
				console.log('from update 404');
				alert('The action failed.\n Please try again');
			}
		}
	};
	let currentUser = getCurrentUser();
	// Send a request
	let url = '/api/todos/' + todoId;
	xhttp.open('PUT', url, true, currentUser);
	xhttp.send(updated_todo);
}

function handleDelete(ev) {
	console.log('in handleDelete');
	if (confirm('Are you sure you want to delete this todo?') == true) {
		let todoID_p = document.getElementsByName('todoId');
		let todoId = todoID_p[0].getAttribute('id');
		///send a request for deleting with todoId
		// Create an XMLHttpRequest object
		const xhttp = new FXMLHttpRequest();
		// Define a callback function
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				alert('The todo was deleted successfully');
				//return home
				returnHome();
			} else if (this.status == 404 || this.status == 403) {
				console.log('from delete');
				alert('The action failed.\n Please try again');
			}
		};
		// check if it's ok and how to implement it, maybe to make a get request?
		let currentUser = getCurrentUser();
		// Send a request
		let url = '/api/todos/' + todoId;
		xhttp.open('DELETE', url, true, currentUser);
		xhttp.send();
	}
}

function sendForAdding(ev) {
	const title = document.getElementById('add_title').value;
	const description = document.getElementById('add_description').value;
	if (title && description) {
		let new_todo = new todo(title, description);
		console.log(new_todo);
		//send request for adding
		// Create an XMLHttpRequest object
		const xhttp = new FXMLHttpRequest();
		// Define a callback function
		xhttp.onreadystatechange = function () {
			console.log('in onreadystatechange in add');
			console.log(this.readyState);
			console.log(this.status);
			if (this.readyState == 4 && this.status == 200) {
				alert('The todo was added successfully');
				returnHome();
				//init();
			} else if (this.readyState == 4 && this.status == 403) {
				console.log('from add 403');
				alert('Your request is wrong.\n Please try again');
			} else if (this.status == 404 || this.status == 403) {
				console.log('from add 404');
				alert('The action failed.\n Please try again');
			}
		};
		// check if it's ok and how to implement it, maybe to make a get request?
		let currentUser = getCurrentUser();
		// Send a request
		let url = '/api/todos';
		xhttp.open('POST', url, true, currentUser);
		xhttp.send(new_todo);
	} else {
		alert('One or more of the fields are empty');
	}
}

function returnHome() {
	window.location.href = 'homepage.html';
}

function addTodo(ev) {
	console.log('in add');
	var x = document.getElementsByTagName('template');
	document.getElementById('todoList').style.display = 'none';
	var temp = document.querySelector('#add-todo');
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
//         if(elementName=='todo'){
//             currentPage="show-todo";
//         }
//         // if(elementName=='home'){
//         //     currentPage="home";
//         // }
//         // else{
//         //     if(elementName == 'add'){
//         //         currentPage = "add-todo";
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
