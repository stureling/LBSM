<template>
	<div id="friends-list">
		<h2 id="friends-title"> Friends </h2>
		<ul>
			<li v-for="friend in friendsList">
				<h4>
					<router-link class="friend-link" v-bind:to="{ name: 'user-template', params: {username: friend}}" > {{friend}} </router-link>
				</h4>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "friends-list",

	props: {
		username: String,
	},

	data() {
		return {
			friendsList: [],
		}
	},
	
	mounted() {
		var dataObject = this;
		this.getFriends();
		this.$root.$on("friendUpdate", function(){
			dataObject.getFriends();
		});
	},

	watch: {
		'$route': 'getFriends'
	},
	
	methods: {
		async getFriends() {
			var dataObject = this;
			var request = $.ajax({ 
			type: 'GET',
			url: "http://127.0.0.1:3000/user/" + this.username + "/friends", 
			xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				dataObject.friendsList = data;
			});

			request.fail(function (statustext) {
				console.log("request failed with: ", statustext);
			});
		}
	},
}
</script>

<style scoped>
ul {
	list-style-type: none; 
	padding: 0px;
	margin-left: 3%
}
#friends-title{
	text-align: left;
	margin-left: 3%;
	color: yellow;
    text-shadow: 2px 2px black;
	padding-right: 10px; 
}
.friend-link{
	color: white;
}
</style>
