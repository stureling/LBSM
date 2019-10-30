<template>
    <div v-if="username !== ''">
        <div>
            <NavBarComponent/>
        </div>
        <div id="home">        
            <h1 id="welcome-title">Welcome {{username}}! </h1>
        </div>
        <div id="post">
            <div id="post-area">
                <PostAreaComponent  v-bind:username="username"/> 
            </div>
            <div id="post-list">
                <PostListComponent v-bind:newPost="newPost" v-bind:username="username"/> 
            </div>
        </div>
        <div id="friend-list-area">
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
        };
    },
    mounted() { 
        this.getData();
        var dataObject = this
        this.$root.$on("postAreaListener", function(message){
            dataObject.newPost = message;
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
                dataObject.username = data;
            });
            
            request.fail(function () {
                dataObject.$router.replace({name: "login"});
            });
        },
    }
}
</script>

<style scoped>
#home {
    margin-left: 16pt;
    margin-top: 1%;
}
#welcome-title {
    color:yellow;
    text-shadow: 2px 2px black;
}
#friend-list-area {
    background-color: teal;
    border: 0px;
    padding: 0.5%;
    border-radius: 15px;
    max-width: 20%;
    margin-right: 1%;
    float: right
}
#post {
    max-width: 80%;
}
#post-area {
    max-width: 81%;
    
}
#post-list {
    border: 0px;
    max-width: 80%;
    border-radius: 15px;
    margin-left: 7pt;
}
</style>

