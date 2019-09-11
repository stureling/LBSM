
function sendMessage(form){
  var message = form.inputbox.value;

  console.log(message.length);
  
  if (message.length > 140 || message.length < 1){
    var error = document.createElement('p');
    error.setAttribute('id', 'errormsg');
    error.appendChild(document.createTextNode('Error: Too many or too few characters. Max 140.'));

    var errbtn = document.createElement('input');
    errbtn.setAttribute('type', 'button');
    errbtn.setAttribute('id', 'errbtn');
    errbtn.setAttribute('value', 'OK');
    errbtn.onclick = closeError;
    error.appendChild(errbtn);
    document.body.appendChild(error);

  }
  else{
    var parentnode = document.getElementById("messagelist");

    var chbx = document.createElement('input');
    chbx.setAttribute('type', 'checkbox');
    chbx.setAttribute('class', 'checkbox');
    chbx.onclick = toggleCheck;
    
    var textbox = document.createElement('p');
    textbox.setAttribute('class', 'unchecked');
    textbox.appendChild(document.createTextNode(message));
    textbox.appendChild(chbx);
    
    parentnode.insertBefore(textbox, parentnode.children[0]);
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

function closeError(){
  document.getElementById('errormsg').remove();
}

