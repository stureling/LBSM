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
		this.handleResponse();
	},
	watch: {
		username: function(){
			this.handleResponse();
		}
	},
	methods: {
		async handleResponse() {
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/status", 
				xhrFields: {withCredentials: true},
			});

			request.done(function (data) {
				if(data === "friends"){
					dataObject.friends = true;
					dataObject.pendingThem = false;
					dataObject.pendingYou = false;
					dataObject.you = false;

				}else if(data === "pending request you"){
					dataObject.friends = false;
					dataObject.pendingThem = false;
					dataObject.pendingYou = true;
					dataObject.you = false;

				}else if(data === "pending request them"){
					dataObject.friends = false;
					dataObject.pendingThem = true;
					dataObject.pendingYou = false;
					dataObject.you = false;

				}else if(data === "you"){
					dataObject.friends = false;
					dataObject.pendingThem = false;
					dataObject.pendingYou = false;
					dataObject.you = true;

				}else if(data === "no relation"){
					dataObject.friends = false;
					dataObject.pendingThem = false;
					dataObject.pendingYou = false;
					dataObject.you = false;
				}
			});
			
			request.fail(function () {
				dataObject.$router.replace({name: "login"})
			});
			
		},
		async addFriend() {
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/addfriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function () {
				dataObject.handleResponse();
				dataObject.buttonPress();
			});
			
			request.fail(function () {
				dataObject.$router.replace({name: "login"});
			});
		},
		async removeFriend() {
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/removefriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function () {
				dataObject.handleResponse();
				dataObject.buttonPress();
			});
			
			request.fail(function () {
				dataObject.$router.replace({name: "login"});
			});
		},
		async acceptFriendReq() {
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/acceptfriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function () {
				dataObject.handleResponse();
				dataObject.buttonPress();
			});
			
			request.fail(function () {
				dataObject.$router.replace({name: "login"});
			});
		},
		async cancelFriendReq() {
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/cancelfriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function () {
				dataObject.handleResponse();
				dataObject.buttonPress();
			});
			
			request.fail(function () {
				dataObject.$router.replace({name: "login"})
			});
		},
		buttonPress(){
			this.$root.$emit("friendUpdate");
		}
	}
}
</script>

<style scoped>

</style>
