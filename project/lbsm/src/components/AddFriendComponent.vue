<template>
    <div id="add-friend">
        <button :onclick="addFriend()">
            Add friend
        </button>
    </div>
</template>

<script >
export default {
    name: "add-friend",

    data() {
        return{};
    },
    
    props: {
        username: String
    },
    methods:{

		async addFriend() {
            console.log("IM IN ADD FRIEDSNSNDJSAJND", this.username)
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

</style>