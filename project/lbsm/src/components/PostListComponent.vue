<template>
	<div id="post-list" >
		<b-button id="toggle-button" :pressed.sync="postsBy" variant="secondary">Toggle post source</b-button>
		<ul v-if="!postsBy">
			<h1 class="postlist-title">Timeline</h1>
			<li v-for="post in to" class="post">
				<div class="meta-bar">
					<p class="meta-text" >Posted by:</p> {{post.poster}}
					<span class="date"> <p class="meta-text" >Date:</p> {{post.date}}</span>
				</div>
				<h5 class="post-text">
					{{post.text}}
				</h5>
			</li>
		</ul>
		<ul v-if="postsBy">
			<h1 class="postlist-title"> Posts made by {{username}} </h1>
			<li v-for="post in from" class="post">
				<div class="meta-bar">
					<p class="meta-text" >Posted to:</p> {{post.postee}}
					<span class="date"> <p class="meta-text" >Date:</p> {{post.date}}</span>
				</div>
				<h5 class="post-text">
					{{post.text}}
				</h5>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "post-list",

	props: {
		username: String,
		newPost: Object,
	},

	data() {
		return {
			to: [],
			from: [],
			postsBy: false,
		}
	},

	watch: {
		newPost: function (newVal){
			this.addNewPost(newVal);
		},
	},

	mounted() {
		this.getPosts();
	},

	methods: {
		addNewPost(post){
			if(post.poster === this.username){
				this.from.unshift(post);
				this.to.unshift(post);
			}else{
				this.to.unshift(post);
			}
		},
		async getPosts() {
			var dataObject = this;
			var request = $.ajax({ 
			type: 'GET',
			url: "http://127.0.0.1:3000/user/" + this.username, 
			xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				dataObject.to = data.to;
				dataObject.from = data.from;
				dataObject.test += 1;
			});

			request.fail(function (statustext) {
				console.log("request failed with: ", statustext);
			});
		},
	},
}
</script>

<style scoped>
ul{
	list-style-type: none;
	padding: 0;
}
#post-list{
	background-color: teal;
	width: 100%;
	float: left;
	padding: 20px;
}
.meta-text{
	display: inline;
    text-shadow: 1px 1px black;
	color: yellow;
}
.date{
	float: right;
}
.post-text{
	overflow-wrap: break-word;
	display: inline;
	margin: 5px;
	color: white;
}
.post{
	border: solid 2px;
	border-color: lightgray;
	border-radius: 15px;
	padding: 5px;
	margin: 5px;
	color: white;
}
.postlist-title{
	color: yellow;
    text-shadow: 2px 2px black;
	overflow-wrap:break-word;
}
</style>>