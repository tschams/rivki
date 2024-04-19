//each user has his todos saved in an array, with his username as the key
//deleted todos are marked with an id of -1

function get(username, id) {
	let items = JSON.parse(localStorage.getItem(username));
	for (i = 0; i < items.length; i++) {
		if (items[i].id == id) {
			return items[i];
		}
	}
	return null;
}
function getall(username) {
	let result = [];
	let items = JSON.parse(localStorage.getItem(username));
	if (items == null) {
		return result;
	}
	for (i = 0; i < items.length; i++) {
		console.log(items[i]);
		if (items[i].id != -1) {
			result.push(items[i]);
		}
	}
	return result;
}
function update(username, id, item) {
	// let updated_todo = { 'title': fn, 'description': ln, 'email': mail};
	let items = JSON.parse(localStorage.getItem(username));
	if (items === null) {
		return false;
	}
	let found = false;
	for (i = 0; i < items.length; i++) {
		if (items[i].id == id) {
			items[i].title = item.title;
			items[i].description = item.description;
			found = true;
		}
	}
	if (found === false) {
		return false;
	}
	localStorage.removeItem(username);
	localStorage.setItem(username, JSON.stringify(items));
	return true;
}
function remove(username, id) {
	let items = JSON.parse(localStorage.getItem(username));
	if (items === null) {
		return false;
	}
	let found = false;
	for (i = 0; i < items.length; i++) {
		if (items[i].id == id) {
			items[i].id = -1;
			found = true;
		}
	}
	if (found === false) {
		return false;
	}
	localStorage.removeItem(username);
	localStorage.setItem(username, JSON.stringify(items));
	return true;
}

function set(username, item) {
	console.log(username);
	let serialTodo = localStorage.serialTodo;
	if (serialTodo) {
		serialTodo++;
	} else {
		serialTodo = 0;
	}
	localStorage.serialTodo = serialTodo;
	item.id = serialTodo;
	let items = JSON.parse(localStorage.getItem(username));
	if (items === null) {
		console.log(items);
		items = [];
	} else {
		localStorage.removeItem(username);
	}
	items.push(item);
	localStorage.setItem(username, JSON.stringify(items));
}
//there is an array of users
function setuser(person) {
	let users = JSON.parse(localStorage.getItem('users'));
	if (users == null) {
		users = [];
	}

	for (i = 0; i < users.length; i++) {
		if (
			users[i].password === person.password ||
			users[i].name === person.name
		) {
			return false;
		}
	}
	users.push(person);
	localStorage.removeItem('users');
	localStorage.setItem('users', JSON.stringify(users));
	return true;
}
function getuser(username) {
	let users = JSON.parse(localStorage.getItem('users'));
	if (users != undefined) {
		for (i = 0; i < users.length; i++) {
			if (users[i].name === username) {
				return users[i].password;
			}
		}
	}

	return null;
}
//the current user is saved in the local storage
function getcurrentuser() {
	return JSON.parse(localStorage.getItem('currentuser'));
}
function setcurrentuser(name) {
	let cu = localStorage.currentUser;
	if (cu != undefined) {
		localStorage.removeItem('currentuser');
	}
	// localStorage.currentuser = JSON.stringify(name);
	localStorage.setItem('currentuser', JSON.stringify(name));
}

//this is a function we didn't end up using
function getby(username, key, value) {
	let items = JSON.parse(localStorage.getItem(username));
	let result = [];

	for (i = 0; i < items.length; i++) {
		if (items[i] != -1) {
			if (key === number) {
				//maybe think how to make this general and specific to our project
				if ((items[i].number = value)) {
					result.push(items[i]);
				}
			}
			if (key === title) {
				if ((items[i].title = value)) {
					result.push(items[i]);
				}
			}
			if (key === description) {
				if ((items[i].description = value)) {
					result.push(items[i]);
				}
			}
			if (key === email) {
				if ((items[i].email = value)) {
					result.push(items[i]);
				}
			}
		}
	}
	return result;
}
