<template>
	<div id="post-list">
		<ul>
			<h1> Posts made to {{username}} </h1>
			<li v-for="post in to">
				Posted by: {{post.poster}}
				<br>
				Posted to: {{post.postee}}
				<br>
				Date: {{post.date}}
				<br>
				{{post.text}}
			</li>
			<h1> Posts made by {{username}} </h1>
			<li v-for="post in from">
				{{post}}
			</li>
		</ul>
	</div>
</template>

		</ul>
	</div>
</template>

<script>
export default {
	name: "post-list",
	props: {
		username: String,
	},
	data() {
		return {
			to: [],
			from: [],
		}
	},
	mounted() {
		this.getPosts()
	},
	methods: {
		async getPosts() {
			var dataObject = this;
			console.log(this.username)
			var request = $.ajax({ 
			type: 'GET',
			url: "http://127.0.0.1:3000/user/" + this.username, 
			xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log(data);
				dataObject.to = data.to;
				dataObject.from = data.from;
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
