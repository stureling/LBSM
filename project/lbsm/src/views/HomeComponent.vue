<template>
    <div id="home">
        <h1>Secure Area</h1>
        <p>
            This is the home area
        </p>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {};
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            var dataObject = this;
            var request = $.ajax({ 
            type: 'GET',
            url: "http://127.0.0.1:3000/home", 
            xhrFields: {withCredentials: true}
            });

            request.done(function (data) {
                console.log(data);
            });
            
            request.fail(function (statustext) {
                console.log("JAG SA ATT DU SUGER", statustext);
                dataObject.$router.replace({name: "login"})
            });
        }
    }
}
</script>

<style scoped>
    #home {
        width: auto;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>

