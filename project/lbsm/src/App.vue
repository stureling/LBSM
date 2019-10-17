<template>
    <div id="app">
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
