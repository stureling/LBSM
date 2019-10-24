<template>
    <div id="friends-list">
        <p>
            Hi this should be the friendslist area
        </p>
    </div>
</template>

<script>
export default {
    name: "friends-list",
    methods: {
        async getPosts() {

            var user = "test" // should be set by frontend

            var dataObject = this;
            var request = $.ajax({ 
            type: 'GET',
            url: "http://127.0.0.1:3000/user/" + user, 
            xhrFields: {withCredentials: true}
            });

            request.done(function (data) {
                console.log(data);

                data.to; // array of posts that were posted to the users page

                data.from; // array of posts made by the user
            });

            request.fail(function (statustext) {
                console.log("request failed with: ", statustext);
                dataObject.$router.replace({name: "login"})
            });
        }
    },
}
</script>

<style>

</style>