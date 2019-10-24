<template>
    <div id="accept-request">
        <button :onclick="acceptFriend()">
            Accept request
        </button>
    </div>
</template>

<script>
export default {
	name: "accept-request",
    data() {
        return{};
    },
    
    props: {
        username: String
    },
    methods: {

		async acceptFriend() {
			console.log("button pressed")
			var dataObject = this;
			var request = $.ajax({ 
				type: 'GET',
				url: "http://127.0.0.1:3000/user/" + this.username + "/acceptfriend", 
				xhrFields: {withCredentials: true}
			});

			request.done(function (data) {
				console.log("request completed")
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

</style>