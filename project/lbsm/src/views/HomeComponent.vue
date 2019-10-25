<template>
    <div>
        <div>
            <NavBarComponent/>
        </div>
        <div id="home">        
            <h1>Welcome {{username}}! </h1>
        </div>
        <div>
           <PostAreaComponent v-if="username !== ''" v-bind:username="username"/> 
        </div>
        <div>
           <PostListComponent v-if="username !== ''" v-bind:username="username"/> 
        </div>
        <div>
            <FriendsListComponent v-if="username !== ''" v-bind:username="username" />
        </div>
        <div>
            <FriendReqListComponent v-if="username !== ''" />
        </div>
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
            messages: []
        };
    },
    mounted() { 
        this.getData();
        var dataThis = this
        this.$root.$on("postAreaListener", function(message){
            console.log("IM IN HOME: ", message)
            dataThis.messages.unshift(message)
            console.log(dataThis.messages)
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

