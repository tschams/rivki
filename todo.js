class todo {
	constructor(title, description) {
		//maybe add more....
		this.title = title;
		this.description = description;
		this.id = -1;
	}
	get name() {
		return this.title + ' ' + this.description;
	}
	// set title(fn){
	//   this.title = fn;
	// }
	// set description(ln){
	//   this.description = ln;
	// }
}
