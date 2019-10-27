<template>
    <div>
		<div v-if="!you && !friends && !pendingThem && pendingYou" id="answer-request">
   			<b-button variant="success" v-on:click="acceptFriendReq()">
				Accept request
			</b-button>
			<b-button variant="danger" v-on:click="cancelFriendReq()">
				Deny request
			</b-button>
		</div>
		<div v-if="!you && !friends && pendingThem && !pendingYou" id="cancel-request">
			<b-button variant="warning" v-on:click="cancelFriendReq()">
				Cancel request
			</b-button>
		</div>
		<div v-if="!you && friends && !pendingThem && !pendingYou" id="remove-friend">
			<b-button variant="danger" v-on:click="removeFriend()">
				Remove friend
			</b-button>
		</div>
		<div v-if="!you && !friends && !pendingThem && !pendingYou" id="add-friend">
			<b-button variant="primary" v-on:click="addFriend()">
				Add friend
			</b-button>
		</div>
		<div v-if="you">
			<p>(you)</p>
		</div>
	</div> 
</template>

<script>
export default {
	name: "friend-handler",
	data() {
		return{
			friends: false,
			pendingThem: false,
			pendingYou: false,
			you: false
		};
	},
	
	props: {
		username: String
	},
    mounted() {
		console.log("buttons for ",this.username)
		this.handleResponse()
	},
	watch: {
		username: function(){
			this.handleResponse()
		}
	},
	methods: {
		async handleResponse() {
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/status", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log("checked status with user", dataObject.username, ", res :", data)
				if(data === "friends"){
					dataObject.friends = true
					dataObject.pendingThem = false
					dataObject.pendingYou = false
					dataObject.you = false

				}else if(data === "pending request you"){
					dataObject.friends = false
					dataObject.pendingThem = false
					dataObject.pendingYou = true
					dataObject.you = false

				}else if(data === "pending request them"){
					dataObject.friends = false
					dataObject.pendingThem = true
					dataObject.pendingYou = false
					dataObject.you = false

				}else if(data === "you"){
					dataObject.friends = false
					dataObject.pendingThem = false
					dataObject.pendingYou = false
					dataObject.you = true

				}else if(data === "no relation"){
					dataObject.friends = false
					dataObject.pendingThem = false
					dataObject.pendingYou = false
					dataObject.you = false
				}
			});
			
			request.fail(function () {
				console.log( "request failed");
				dataObject.$router.replace({name: "login"})
			});
			
		},
		async addFriend() {
			console.log("add button pressed")
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/addfriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log("add request done, res: ", data)
				dataObject.handleResponse()
			});
			
			request.fail(function () {
				console.log( "request failed");
				dataObject.$router.replace({name: "login"})
			});
		},
		async removeFriend() {
			console.log("remove button pressed")
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/removefriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log("remove request done, res: ", data)
				dataObject.handleResponse()
			});
			
			request.fail(function () {
				console.log( "request failed");
				dataObject.$router.replace({name: "login"})
			});
		},
		async acceptFriendReq() {
			console.log("accept button pressed")
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/acceptfriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log("accept request done, res: ", data)
				dataObject.handleResponse()
			});
			
			request.fail(function () {
				console.log( "request failed");
				dataObject.$router.replace({name: "login"})
			});
		},
		async cancelFriendReq() {
			console.log("cancel button pressed")
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/cancelfriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log("cancel request done, res: ", data)
				dataObject.handleResponse()
			});
			
			request.fail(function () {
				console.log( "request failed");
				dataObject.$router.replace({name: "login"})
			});
		},
	}
}
</script>

<style scoped>

</style>
