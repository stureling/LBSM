<template>
	<div v-if="friend && !notFound">
		<div>
			<NavBarComponent/>
		</div>
		<div id="user-template">        
			<h1 id="welcome-title">Welcome to the page of {{username}}! 
				<FriendHandlerButtonsComponent v-bind:username="username" />
			</h1>
		</div>  
			
		<div id="post">
			<div id="post-area">
			   <PostAreaComponent  v-bind:username="username"/>
			</div>
			<div id="post-list">
			   <PostListComponent v-bind:newPost="newPost" v-bind:username="username"/>
			</div>
		</div>
		<div id="friend-lists">
			<FriendsListComponent  v-bind:username="username" />
		</div>
	</div>
	<div v-else-if="!notFound">
		<div>
			<NavBarComponent/>
		</div>
		<div id="user-template">        
			<h1 id="welcome-title">You are not friends with {{username}}!</h1> 
			<h1> <FriendHandlerButtonsComponent v-bind:username="username" /> </h1>
		</div>
	</div>
	<div v-else>
		<div>
			<NavBarComponent/>
		</div>
		<div id="user-template">        
			<h1 id="welcome-title">
				User not found!
			</h1>
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
			notFound: false,
		};
	},
	mounted() { 
        this.getLogUser();
        this.checkFriendship();
		var dataObject = this;
		this.$root.$on("postAreaListener", function(message){
			dataObject.newPost = message;
		})
		this.$root.$on("friendUpdate", function(){
			dataObject.checkFriendship();
		})
		
	},
	methods: {
        async getLogUser(){
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/home", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				dataObject.logUser = data;
			});
			
			request.fail(function () {
				dataObject.$router.replace({name: "login"});
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
			request.fail(function (statustext) {
				if(statustext.status == 404){
					dataObject.notFound = true;
				}else if (statustext.status == 401){
					dataObject.$router.replace({name: "login"});
				}else{
					dataObject.$router.replace({name: "users"});
				}

			});
        },
	}
}
</script>

<style scoped>

#user-template {
    margin-left: 16pt;
    margin-top: 1%;
}
#welcome-title {
    color:yellow;
    text-shadow: 2px 2px black;
}
#friend-lists {
    background-color: teal;
	padding: 0.5%;
    border: 0px;
    border-radius: 15px;
    max-width: 20%;
    margin-right: 1%;
    float: right
}
#post {
    max-width: 80%;
}
#post-area {
    max-width: 81%;
    
}
#post-list {
    border: 0px;
    max-width: 80%;
    border-radius: 15px;
    margin-left: 7pt;
}
</style>
