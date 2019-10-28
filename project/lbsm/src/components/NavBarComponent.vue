
<template>
    <div id="nav-bar">
        <b-navbar toggleable="lg" type="dark" >
        <b-navbar-brand id="brand" href="http://localhost:8080/#/home" >LBSM</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            
            <b-navbar-item href="/#/users">
                <router-link class="navbar-link" style="color: white" to="/users"> Find friends</router-link>
            </b-navbar-item>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
            
            <b-navbar-item  href="/#/login" v-on:click.native="logOut()">
                <router-link class="navbar-link" to="/login" v-on:click.native="logOut()" replace>Logout</router-link>
            </b-navbar-item>

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
            var dataObject = this;
            var request = $.ajax({
                type: "GET",
                url: "http://127.0.0.1:3000/logout",
                xhrFields: { withCredentials: true }
            });

            request.done(function() {
                //console.log(data);
            });

            request.fail(function() {
                //console.log("JAG SA ATT DU SUGER", statustext);
                dataObject.$router.replace({ name: "login" });
            });
        },
    }
};
</script>


<style>
#nav-bar{
    background-color: teal;
    text-shadow: 2px 2px black;
}
.navbar-link{
    color: white;
}

#brand{
    margin-left: 0.45%;
}

</style>
