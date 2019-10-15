<template>
    <div id="sign-up">
        <div id="nav">
            <p>Already a user? 
                <router-link to="/login">Click here to login.</router-link> 
            </p>
        </div>
        
        <form>
            <h1>Sign Up</h1>

            <label>Email</label>

            <input 
                type="text" 
                name="email" 
                v-model="input.email" 
                placeholder="E-mail" 
            />

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
            <button type="button" v-on:click="signUp()">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'sign-up',
    data() {
        return {    
            submitting: false,
            error: false,
            success: false,
            input: {        
                email: '',
                name: '',
                password: '',
            },
        }
    },

    methods: {
        async signUp() {
            try{
                var jsonInp = {
                    "email": this.input.email,
                    "username": this.input.username,
                    "password": this.input.password
                }

                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    cors: 'cors',
                    headers: {
                        Accept:'application/json',
                        'Content-type': 'application/json; charset=UTF-8',
                        
                    },
                    credentials: "same-origin",
                    body: JSON.stringify(jsonInp), 
                })

                const data = await response.text();
                console.log(data);

                
                if(data == "user registered") {
                    this.$router.replace({ name: "login" });
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
    #sign-up {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>