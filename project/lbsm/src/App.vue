<template>
    <div id="app">
        <div style="background: black">
            <b-row class="header">
                <b-navbar type="dark" variant="dark">
                  <b-navbar-nav>
                    <b-nav-item href="#">Home</b-nav-item>
                    <!-- Navbar dropdowns -->
                    <b-nav-item-dropdown text="User" right>
                      <b-dropdown-item href="#">Account</b-dropdown-item>
                      <b-dropdown-item href="#">Settings</b-dropdown-item>
                      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link> 
                    </b-nav-item-dropdown>
                  </b-navbar-nav>
                </b-navbar>
            </b-row>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>

<script>

export default {
    name: 'app',

    data() {
        return {
            authenticated: false,
        }
    },
    mounted() {
        if(!this.authenticated) {
            //this.$router.replace({ name: "login" });
            this.$router.replace({ name: "sign-up" });
        }
    },
    methods: {
        setAuthenticated(status) {
            this.authenticated = status;
        },
        logout() {
            this.authenticated = false;
        }
    }
}
</script>

<style>  
.header {
    display: flex;
    justify-content: space-between;
    margin-right: 2%;
}

body {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    background-color: #e6ecf0;
    margin: 0;
}
h1 {
    padding: 0;
    margin-top: 0;
}
#app {
    width: 1024px;
    margin: auto;
}
</style>
