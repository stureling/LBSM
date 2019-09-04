function sendMessage(form){
  var message = form.inputbox.value;
  if (message.length > 140 || message.length < 1){
    console.log("Failure, you typed:  " + message);
    console.log(message.length);
  }
  else{
    var parentnode = document.getElementById("messagelist");
    var melement = document.createElement('div');
    melement.id = "message"
    melement.innerHTML = "<h1>" + message + "</h1>" + '<input type="checkbox" name="checkbox" >'
    parentnode.insertBefore(melement, parentnode.children[0]);
  }
}
