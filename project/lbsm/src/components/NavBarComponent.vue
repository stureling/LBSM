
<template>
    <div id="nav-bar">
        <b-navbar toggleable="lg" type="dark" >
        <b-navbar-brand id="brand" href="http://localhost:8080/#/home" >LBSM</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            
            <b-nav-item href="/#/users">
                <router-link id="friends-list-link" class="navbar-link" style="color: white" to="/users"> Find friends</router-link>
            </b-nav-item>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
            
            <b-nav-item  href="/#/login" v-on:click.native="logOut()">
                <router-link id="logout-link" class="navbar-link" to="/login" v-on:click.native="logOut()" replace>Logout</router-link>
            </b-nav-item>

            </b-navbar-nav>
        </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "nav-bar",

    data() {
        return {};
    },

    methods: {
        async logOut() {
            var request = $.ajax({
                type: "GET",
                url: "http://127.0.0.1:3000/logout",
                xhrFields: { withCredentials: true }
            });

            request.done(function(data) {
                console.log(data);
            });

            request.fail(function(statusText) {
                console.log(statusText);
            });
        },
    }
}
</script>

<style>
#nav-bar {
    background-color: teal;
    text-shadow: 2px 2px black;
}
#brand {
    margin-left: 0.45%;
}
.nav-item {
    list-style-type: none; 
	padding: 0px;
}
.navbar-link {
    color: white;
}
</style>
