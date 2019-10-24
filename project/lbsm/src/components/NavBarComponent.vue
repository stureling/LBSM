
<template>
    <div id="nav-bar">
        <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="http://localhost:8080/#/home" >LBSM</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
            <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                <em>User</em>
                </template>
                <!-- risky to hardcode /login.. Risky code indeed -->
                <b-dropdown-item href="/#/login" v-on:click.native="logOut()">
                    <router-link to="/login" v-on:click.native="logOut()" replace>Logout</router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                    <router-link to="/friends"> Friends list</router-link>
                </b-dropdown-item>

            </b-nav-item-dropdown>
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
        }
    }
};
</script>


<style>

</style>
