class network{
        request(fajax){
            let ser = new server();
            let response = ser.serverrecieve(fajax);//check how we have access to the server file
            fajax.responseText=response.responsetext;
            fajax.status=response.status;
            fajax.message=response.message;
            fajax.readyState=4;//request finished and response ready
            fajax.onreadystatechange();
        }
}


// function request(fajax)
// {
//     return serverrecieve(fajax);//check how we have access to the server file
// }
