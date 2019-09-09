var i = 0;

function sendMessage(form){
  var message = form.inputbox.value;
  console.log(message.length);
  if (message.length > 140 || message.length < 1){
    console.log("Failure, you typed:  " + message);
    console.log(message.length);
  }
  else{
    var parentnode = document.getElementById("messagelist");
    var melement = document.createElement('div');
    melement.setAttribute('id', 'message' + i);
    melement.setAttribute('class', 'unchecked');

    var chbx = document.createElement('input');
    chbx.setAttribute('type', 'checkbox');
    chbx.setAttribute('id', 'checkbox' + i);
    chbx.setAttribute('value', message);
    chbx.onclick = toggleCheck
    
    var textbox = document.createElement('p');
    textbox.appendChild(document.createTextNode(message));
    melement.appendChild(textbox);
    melement.appendChild(chbx);
    
    parentnode.insertBefore(melement, parentnode.children[0]);
    i += 1;
  }
}

function toggleCheck(){
  if (this.checked){
    this.parentElement.setAttribute('class', 'checked');
  }
  else{
    this.parentElement.setAttribute('class', 'unchecked');
  }
}

