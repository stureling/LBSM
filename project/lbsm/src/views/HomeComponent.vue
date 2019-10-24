<template>
    <div>
        <div>
            <NavBarComponent/>
        </div>
        <div id="home">        
            <h1>Welcome {{username}}! </h1>
        </div>
        <div>
           <PostAreaComponent v-bind:username="username"/> 
        </div>
        <div>
            <ul>
                <li id="postMessages" v-for="post in messages">
                    {{ post }}
                </li>
            </ul>
        </div>
        <div>
            <FriendsListComponent />
        </div>
    </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue'
import PostAreaComponent from '@/components/PostAreaComponent.vue'
import FriendsListComponent from '@/views/FriendsListComponent.vue';

export default {
    name: 'home',
 
    components: {
        NavBarComponent,
        PostAreaComponent,
        FriendsListComponent,
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

