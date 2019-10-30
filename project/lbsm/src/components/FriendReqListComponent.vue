<template>
	<div id="friendreqs-list">
		<h2 id="friend-req-title"> Friend requests </h2>
		<ul>
			<li v-for="friend in friendReqList">
				<h4>
					<router-link class="friend-link" v-bind:to="{ name: 'user-template', params: {username: friend}}"> {{friend}} </router-link>
				</h4>
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
		var dataObject = this;
		this.getFriends();
		this.$root.$on("friendUpdate", function(){
			dataObject.getFriends();
		});
	},
	methods: {
		async getFriends() {
			var dataObject = this;
			var request = $.ajax({ 
			type: 'GET',
			url: "http://127.0.0.1:3000/friendrequests", 
			xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				dataObject.friendReqList = data;
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
	margin-left: 3%;
}
#friend-req-title{
	text-align: left;
	margin-left: 3%;
	color: yellow;
    text-shadow: 2px 2px black;
}
.friend-link{
	color: white;
}
</style>
