<template>
	<div>
		<div>
			<NavBarComponent/>
		</div>
		<div id="user-template">        
			<h1>Welcome to the page of {{username}}! </h1>
		</div>  

        <div>
		   <AddFriendComponent v-bind:username="username"/>
        </div>

        <div>
		   <AcceptRequestComponent v-bind:username="username"/>
        </div>

		<div>
		   <PostAreaComponent v-bind:username="username"/>
		</div>

		<div>
			<ul>
				<li id="post-messages" v-for="post in to">
					{{ post }}
				</li>
			</ul>
		</div>
		<div>
			<FriendsListComponent />
		</div>
	</div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue';
import PostAreaComponent from '@/components/PostAreaComponent.vue';
import FriendsListComponent from '@/views/FriendsListComponent.vue';
import AddFriendComponent from '@/components/AddFriendComponent.vue';
import AcceptRequestComponent from '@/components/AcceptRequestComponent.vue';

export default {
	name: 'user-template',
 
	components: {
		NavBarComponent,
		PostAreaComponent,
        FriendsListComponent,
        AddFriendComponent,
        AcceptRequestComponent,
	},

	data() {
		return {
			data: '',
			to: [],
			from: [],
			username: this.$route.params.username
		};
	},
	mounted() { 
		this.getPosts();
		console.log(this.in)
		console.log(this.from)
		console.log("THESE ARE THE PARAMS" , this.$route.params)
		var dataThis = this
		this.$root.$on("postAreaListener", function(message){
			console.log("IM IN HOME: ", message)
			dataThis.messages.unshift(message)
			console.log(dataThis.messages)
		})
	},
	methods: {
		async getPosts() {
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username, 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log("getposts data: ", typeof(data));
				if (typeof(data) !== String){
					dataObject.to = data.to
					dataObject.from = data.from
				}
			});
			
			request.fail(function () {
				console.log( "request failed");
				dataObject.$router.replace({name: "login"})
			});
		},
		async acceptFriend() {
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/addfriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log(data)
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
ul {
	border-color: red;
	border: 3px
}
.button {
    margin-left: 30%;
}
</style>