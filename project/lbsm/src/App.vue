<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'app',

    data() {
        return {};
    },
    mounted() {
        this.$router.replace({ name: "home" });
    },
}
</script>

<style>  

</style>

#app {
    background-color: teal; 
}
.header {
    display: flex;
    justify-content: space-between;
    margin-right: 2%;
}
body {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    background-color:red;
    margin: 0;
}
h1 {
    padding: 0;
    margin-top: 0;
}