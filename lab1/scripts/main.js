var messages = [];

function sendMessage(form){
  var message = form.inputbox.value;
  if (message.length > 140 || message.length < 1){
    console.log("Failure, you typed:  " + message);
    console.log(message.length);
  }
  else{
    console.log("Success, you typed:  " + message);
    console.log(message.length);
    messages.unshift(message);
    messages.forEach(function(item, index, array){
      console.log(item, index);
    });
  }
}


