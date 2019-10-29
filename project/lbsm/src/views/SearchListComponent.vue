<template>
    <div id="search-list">
        <div>
            <NavBarComponent />
        </div>
        <div>
            <b-form-input id="search-bar" v-model="searchText"  placeholder="Search for a user"></b-form-input>
        </div>
        <div >
            <ul>
                <li v-for="user in filterUsers">
                    <h3>
                        <router-link  class="users-in-list" v-bind:to="{ name: 'user-template', params: {username: user}}"> {{user}} </router-link>
                    </h3>
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
            this.computed = false;
            this.computed = true;
            var dataObject = this;
            return dataObject.userList.filter(function(element){
                return element.match(dataObject.searchText);
            });
        },
    },
    mounted() {
        this.getAll();
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
                dataObject.userList = data;
            });
            
            request.fail(function (statustext) {
                dataObject.$router.replace({name: "login"});
            });
        },
    }
}
</script>

<style>
ul {
	list-style-type: none; 
	padding: 0px;
	margin-left: 1%
}
.users-in-list {
    color: yellow;
    text-shadow: 2px 2px black;
}
</style>