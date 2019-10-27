<template>
    <div v-if="username !== ''">
        <div>
            <NavBarComponent/>
        </div>
        <div id="home">        
            <h1>Welcome {{username}}! </h1>
        </div>
        <div>
           <PostAreaComponent  v-bind:username="username"/> 
        </div>
        <div>
           <PostListComponent v-bind:newPost="newPost" v-bind:username="username"/> 
        </div>
        <div>
            <FriendsListComponent  v-bind:username="username" />
        </div>
        <div>
            <FriendReqListComponent  />
        </div>
    </div>
    <div v-else>
    </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue'
import PostAreaComponent from '@/components/PostAreaComponent.vue'
import PostListComponent from '@/components/PostListComponent.vue'
import FriendsListComponent from '@/components/FriendsListComponent.vue';
import FriendReqListComponent from '@/components/FriendReqListComponent.vue';

export default {
    name: 'home',
 
    components: {
        NavBarComponent,
        PostAreaComponent,
        PostListComponent,
        FriendsListComponent,
        FriendReqListComponent,
    },

    data() {
        return {
            username: '',
            newPost: {},
            messages: []
        };
    },
    mounted() { 
        this.getData();
        var dataObject = this
        this.$root.$on("postAreaListener", function(message){
            dataObject.newPost = message
			console.log("new post caught in home: ", dataObject.newPost);
        })
    },
    methods: {
        async getData() {
            var dataObject = this;
            var request = $.ajax({ 
            type: 'GET',
            url: "http://127.0.0.1:3000/home", 
            xhrFields: {withCredentials: true}
            });

            request.done(function (data) {
                //console.log( data);
                dataObject.username = data
            });
            
            request.fail(function () {
                //console.log("JAG SA ATT DU SUGER", statustext);
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
#postMessages {
    margin-left: 30%;
}
</style>

