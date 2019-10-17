<template>
    <div id="app">
        <NavBarComponent/>
        <router-view/>
    </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue'

export default {
    name: 'app',

    components: {
        NavBarComponent,
    },

    data() {
        return {};
    },
    mounted() {
        this.$router.replace({ name: "home" });
    },
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
    background-color:red;
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
