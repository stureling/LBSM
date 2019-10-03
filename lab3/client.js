

function sendMessage(message){
	var url = "http://localhost:3000/save?message=" + message;
	$.get(url, function(data, status){
		console.log(data);
		console.log(status);
		displayMessages();
	}).fail( 
	function(res){
		console.log(res["responseText"]);
		var data = res["responseText"];
		sendError(data);
	});	
}

function displayMessages(){
	var url = "http://localhost:3000/getall"; 
	var parentnode = document.getElementById("messagelist");
	parentnode.innerHTML = "";


	$.get(url, function(data, status){
		console.log(data);
		console.log(status);
		for(message in data){
			console.log(data[message]["message"]);
			var id = data[message]["_id"];
			var textbox = document.createElement('p');
			textbox.setAttribute('id', id);
			textbox.onclick = function(){
				setRead(this.id);
			}
			if (data[message]["flag"] == true){
				textbox.setAttribute('class', 'read');
			}else{
				textbox.setAttribute('class', 'unread');
			}
			textbox.appendChild(document.createTextNode(data[message]["message"]));
			parentnode.insertBefore(textbox, parentnode.children[0]);
		}
	});	
}

function sendError(message){
	var error = document.createElement('p');
	error.setAttribute('id', 'errormsg');
	error.appendChild(document.createTextNode(message));

	var errbtn = document.createElement('input');
	errbtn.setAttribute('type', 'button');
	errbtn.setAttribute('id', 'errbtn');
	errbtn.setAttribute('value', 'OK');
	errbtn.onclick = closeError;
	error.appendChild(errbtn);
	document.body.appendChild(error);

 }

function setRead(id){
	var url = "http://localhost:3000/flag?id=" + id;
	$.get(url, function(data, status){
		console.log(data);
		console.log(status);
		document.getElementById(id).setAttribute('class', 'read');
	}).fail( 
	function(res){
		console.log(res["responseText"]);
		var data = res["responseText"];
		sendError(data);

	});	
}


function closeError(){
	document.getElementById('errormsg').remove();
}

displayMessages();