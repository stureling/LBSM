<template>
    <div v-if="username !== ''">
        <div>
            <NavBarComponent/>
        </div>
        <div id="home">        
            <h1>Welcome {{username}}! </h1>
        </div>
        <div id="post">
            <div id="post-area">
                <PostAreaComponent  v-bind:username="username"/> 
            </div>
            <div id="post-list">
                <PostListComponent v-bind:newPost="newPost" v-bind:username="username"/> 
            </div>
        </div>
        <div id="friend-lists">
            <FriendsListComponent  v-bind:username="username" />
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
#friend-lists {
    background-color: teal;
    border: 0px;
    border-radius: 15px;
    max-width: 20%;
    margin-right: 1%;
    float: right
}
#post-list {
    border: 0px;
    max-width: 80%;
    border-radius: 15px;
}
#post {
    max-width: 60%;
    margin-left: 10pt;
}
</style>

