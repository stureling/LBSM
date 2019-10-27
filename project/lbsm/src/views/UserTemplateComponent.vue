<template>
	<div v-if="friend">
		<div>
			<NavBarComponent/>
		</div>
		<div id="user-template">        
			<h1>Welcome to the page of {{username}}! You are {{logUser}} </h1>
		</div>  
		<div>
		   <PostAreaComponent  v-bind:username="username"/>
		</div>
		<div>
		   <PostListComponent v-bind:newPost="newPost" v-bind:username="username"/>
		</div>
		<div>
			<FriendsListComponent  v-bind:username="username" />
		</div>
		<div>
			<FriendHandlerButtonsComponent v-bind:username="username" />
		</div>
	</div>
	<div v-else>
		<div>
			<NavBarComponent/>
		</div>
		<h1>You are not friends with {{username}}</h1>
		<div>
			<FriendHandlerButtonsComponent v-bind:username="username" />
		</div>
	</div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue';
import PostAreaComponent from '@/components/PostAreaComponent.vue';
import PostListComponent from '@/components/PostListComponent.vue';
import FriendsListComponent from '@/components/FriendsListComponent.vue';
import FriendHandlerButtonsComponent from '@/components/FriendHandlerButtonsComponent.vue'

export default {
	name: 'user-template',
 
	components: {
		NavBarComponent,
		PostAreaComponent,
		PostListComponent,
        FriendsListComponent,
        FriendHandlerButtonsComponent,
	},

	data() {
		return {
			data: '',
			newPost: {},
			friend: false,
			username: this.$route.params.username,
			logUser: '',
		};
	},
	mounted() { 
		console.log("THESE ARE THE PARAMS" , this.$route.params)
        this.getLogUser();
        this.checkFriendship();
		var dataObject = this
		this.$root.$on("postAreaListener", function(message){

			dataObject.newPost = message
			console.log("new post caught in user template: ", dataObject.newPost);
		})
		
	},
	methods: {
        async getLogUser(){
			var dataObject = this
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/home", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				//console.log( data);
				dataObject.logUser = data
			});
			
			request.fail(function () {
				dataObject.$router.replace({name: "login"})
			});
		},
        async checkFriendship(){
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/status", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				if(data === "friends" || data === "you"){
                    dataObject.friend = true;
                }
                else{
                    dataObject.friend = false;    
                }
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
#home {
	margin-left: 1%;
	margin-top: 1%;
}
#post-messages {
	margin-left: 30%;
}
div {
	border-color: red;
	border: 3px
}
</style>
