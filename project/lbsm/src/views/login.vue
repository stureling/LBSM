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
            $.ajax({ 
            type: 'POST',
            url: "http://127.0.0.1:3000/login", 
            data : {username: "stu", password: "stu" },
            xhrFields: {withCredentials: true}
            }).done(function( data ) {
                console.log(data);
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
