<template>
    <div id="search-list">
        <div>
            <NavBarComponent />
        </div>
        <div>
            <b-form-input v-model="searchText" placeholder="Search for a user"></b-form-input>
        </div>
        <div >
            <ul v-for="user in filterUsers">
                <li>
                    <router-link v-bind:to="{ name: 'user-template', params: {username: user}}"> {{user}} </router-link>
                    <FriendHandlerButtonsComponent v-bind:username="user"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue'
import FriendHandlerButtonsComponent from '@/components/FriendHandlerButtonsComponent.vue'

export default {
    name: "search-list",

    components: {
        NavBarComponent,
        FriendHandlerButtonsComponent,
    },
    data() {
        return{
            searchText: '',
            userList: [],
        }
    },
    computed: {
        filterUsers(){
            var dataObject = this;
            return dataObject.userList.filter(function(element){
                console.log(element.match(dataObject.searchText))
                return element.match(dataObject.searchText);
            });
        },
    },
    mounted() {
        this.getAll()
    },
    methods: {
        async getAll() {
            var dataObject = this;
            var request = $.ajax({ 
            type: 'GET',
            url: "http://127.0.0.1:3000/users", 
            xhrFields: {withCredentials: true}
            });

            request.done(function (data) {
                console.log(data);
                dataObject.userList = data;
            });
            
            request.fail(function (statustext) {
                console.log("request failed with: ", statustext);
                dataObject.$router.replace({name: "login"})
            });
        },
    }
}
</script>

<style>

</style>