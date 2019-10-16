<template>
    <div id="login">
        <div id="nav">
            <p>Not a user? 
                <router-link to="/sign-up">Click here to sign-up.</router-link> 
            </p>
        </div>
        
        <form>
            <h1>Login</h1>
            <label>Username</label>
            <input 
                type="text" 
                name="username" 
                v-model="input.username" 
                placeholder="Username" 
            />

            <label>Password</label>
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
            try{
                
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    cors: 'cors',
                    headers: {
                        Accept:'application/json',
                        'Content-type': 'application/json; charset=UTF-8',
                        
                    },
                    credentials: "same-origin",
                    body: JSON.stringify({
                        username: this.input.username,
                        password: this.input.password,
                    }), 
                })

                console.log(response)
                const data = await response.text();
                console.log(data);
                

                
                if(data == "Logged in") {
                    this.$emit("authenticated", true);
                    this.$router.replace({ name: "secure" });
                } else {
                    console.log("The username and / or password is incorrect");
                }
                
            } catch (error) {
                console.log(error);
            }
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