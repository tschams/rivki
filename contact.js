let serial=0;
class contact {

    constructor(number, firstname, lastname){//maybe add more....
      this.number=number;
      this.firstname=firstname;
      this.lastname=lastname;
      this.id=serial;
      serial++;
    }
    getname()
    {
        return this.firstname+" "+this.lastname;
    }
    }