<template>
    <div id="login">
        <div id="nav">
            <p>Not a user? 
                <router-link to="/sign-up">Click here to sign-up.</router-link> 
            </p>
        </div>
        
        <form>
            <h1>Login</h1>
            <input 
                type="text" 
                name="username" 
                v-model="input.username" 
                placeholder="Username" 
            />

            <input 
                type="password" 
                name="password" 
                v-model="input.password" 
                placeholder="Password" 
            />
            <button type="button" v-on:click="login()">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            input: {
                username: '',
                password: '',
            }
        }
    },
    methods: {

        async login() {

            var dataObject = this

            var request = $.ajax({ 
            type: 'POST',
            url: "http://127.0.0.1:3000/login", 
            data : {
                username: this.input.username, 
                password: this.input.password, 
            },
            xhrFields: {withCredentials: true}
            });

            request.done(function( data ) {

                if(data == dataObject.input.username) {
                    dataObject.$router.replace({ name: "home" });
                } else {
                    console.log("INVALID USERNAME OR PASSWORD")
                }
            });

            request.fail(function() {
                alert("Du suger");
            });
        },
    }
}
</script>

<style scoped>
#login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
}
</style>
