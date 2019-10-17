<template>
    <div id="sign-up">
        <div id="nav">
            <p>Already a user? 
                <router-link to="/login">Click here to login.</router-link> 
            </p>
        </div>
        
        <form>
            <h1>Sign Up</h1>

            <input 
                type="text" 
                name="email" 
                v-model="input.email" 
                placeholder="E-mail" 
            />

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
            <button type="button" v-on:click="signUp()">Sign up</button>
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
                username: '',
                password: '',
            },
        }
    },

    methods: {
        async signUp() {

            var dataObject = this
            
            $.ajax({ 
            type: 'POST',
            url: "http://127.0.0.1:3000/register", 
            data: {
                username: this.input.username, 
                password: this.input.password, 
                email: this.input.email,
            },
            xhrFields: {withCredentials: true}
            }).done(function( data ) {
                console.log(data);

                if(data == "user registered") {
                    dataObject.$router.replace({ name: "login" });
                } else {
                    console.log("The username and / or password is incorrect");
                }

            }) 
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
