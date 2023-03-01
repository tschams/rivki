let serial=0;
class contact {

    constructor(phonenumber, firstname, lastname, email){//maybe add more....
      this.phonenumber=phonenumber;
      this.firstname=firstname;
      this.lastname=lastname;
      this.email=email;
      this.id=serial;
      serial++;
    }
    get name(){
        return this.firstname+" "+this.lastname;
    }
    // get phonenumber(){
    //   return this.phonenumber;
    // }
    // get email(){
    //   return this.email;
    // }
    // set firstname(fn){
    //   this.firstname = fn;
    // }
    // set lastname(ln){
    //   this.lastname = ln;
    // }
    // // set phonenumber(num){
    // //   this.phonenumber = num;
    // //}
    // set email(mail){
    //   this.email = mail;
    // }
}