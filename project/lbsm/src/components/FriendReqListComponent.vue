<template>
	<div id="friendreqs-list">
		<ul>
			<h1> Friend requests </h1>
			<li v-for="friend in friendReqList">
                <router-link v-bind:to="{ name: 'user-template', params: {username: friend}}"> {{friend}} </router-link>
				<FriendHandlerButtonsComponent v-bind:username="friend"/>
			</li>
		</ul>
	</div>
</template>

<script>
import FriendHandlerButtonsComponent from '@/components/FriendHandlerButtonsComponent.vue'
export default {
	name: "friendreqs-list",
    components: {
		FriendHandlerButtonsComponent,
	},
	data() {
		return {
			friendReqList: [],
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
			url: "http://127.0.0.1:3000/friendrequests", 
			xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log(data);
				dataObject.friendReqList = data;
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
