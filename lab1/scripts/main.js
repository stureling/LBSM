var messages = [];

function sendMessage(form){
  var message = form.inputbox.value;
  if (message.length > 140 || message.length < 1){
    console.log("Failure, you typed:  " + message);
    console.log(message.length);
  }
  else{
    var parentnode = document.getElementById("messagelist");
    var melement = document.createElement('div');
    melement.innerText =  message ;
    parentnode.insertBefore(melement, parentnode.children[0]);
  }
}
