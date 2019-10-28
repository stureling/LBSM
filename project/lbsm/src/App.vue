<template>
    <div id="app">
        <router-view :key="$route.params.username"/>
    </div>
</template>

<script>
export default {
    name: 'app',

    data() {
        return {};
    },
}
</script>

<style>  
body {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    background-color:lightblue;
    margin: 0;
}
h1 {
    padding: 0;
    margin-top: 0;
}
.header {
    display: flex;
    justify-content: space-between;
    margin-right: 2%;
}
</style>