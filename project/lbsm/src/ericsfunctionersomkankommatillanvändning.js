// Template
async template() {
    var dataObject = this;
    var request = $.ajax({ 
    type: 'GET',
    url: "http://127.0.0.1:3000/", 
    xhrFields: {withCredentials: true}
    });

    request.done(function (data) {
        console.log(data);
    });
    
    request.fail(function (statustext) {
        console.log("request failed with: ", statustext);
        dataObject.$router.replace({name: "login"})
    });
}
// partially completed functions

async getPosts() {
    
    var user = "test" // should be set by frontend

    var dataObject = this;
    var request = $.ajax({ 
    type: 'GET',
    url: "http://127.0.0.1:3000/user/" + user, 
    xhrFields: {withCredentials: true}
    });

    request.done(function (data) {
        console.log(data);
        
        data.to; // array of posts that were posted to the users page
        
        data.from; // array of posts made by the user
    });
    
    request.fail(function (statustext) {
        console.log("request failed with: ", statustext);
        dataObject.$router.replace({name: "login"})
    });
}


async friendEventhandler() {

    var user = "test" // should be set by frontend

    var dataObject = this;
    var request = $.ajax({ 
    type: 'GET',
    url: "http://127.0.0.1:3000/user/" + user + "/status", 
    xhrFields: {withCredentials: true}
    });

    request.done(function (data) {
        console.log(data);
        
        // EVENT HANDLER
        if(data === "friends"){

        }else if(data === "pending request them"){

        }else if(data === "pending request you"){

        }else if(data === "not friends"){
        
        }else{
            console.log("server response not recognized: ", data)
        }
    });
    
    request.fail(function (statustext) {
        console.log("request failed with: ", statustext);
        dataObject.$router.replace({name: "login"})
    });
}

async getAllUsers() {
    var dataObject = this;
    var request = $.ajax({ 
    type: 'GET',
    url: "http://127.0.0.1:3000/users", 
    xhrFields: {withCredentials: true}
    });

    request.done(function (data) {
        console.log(data);
    });
    
    request.fail(function (statustext) {
        console.log("request failed with: ", statustext);
        dataObject.$router.replace({name: "login"})
    });
}