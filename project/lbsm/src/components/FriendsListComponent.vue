<template>
	<div id="friends-list">
		<ul>
			<h1> Friends </h1>
			<li v-for="friend in friendsList">
                <router-link v-bind:to="{ name: 'user-template', params: {username: friend}}"> {{friend}} </router-link>
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
		this.getFriends()
	},
	methods: {
		async getFriends() {
			var dataObject = this;
			console.log(this.username)
			var request = $.ajax({ 
			type: 'GET',
			url: "http://127.0.0.1:3000/user/" + this.username + "/friends", 
			xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log(data);
				dataObject.friendsList = data;
			});

			request.fail(function (statustext) {
				console.log("request failed with: ", statustext);
			});
		}
	},
}
</script>

<style>

</style>
