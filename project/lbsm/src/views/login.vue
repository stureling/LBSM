<template>
    <div id="login">
        <form>
            <label>Login</label>
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
                username: "",
                password: "",
            }
        }
    },
    methods: {

        async login() {
            try{
                var jsonInp = {
                    "username": this.input.username,
                    "password": this.input.password
                }

                console.log(typeof jsonInp)
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    cors: 'cors',
                    headers: {
                        Accept:'application/json',
                        'Content-type': 'application/json; charset=UTF-8',
                        
                        },
                    credentials: "same-origin",
                    body: JSON.stringify(jsonInp), 
                })

                const data = await response.text()
                console.log(data)

            } catch (error) {
                console.log(error)
            }
        },





        /*
        login() {
            if(this.input.username != "" && this.input.password != "") {

                if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                    this.$emit("authenticated", true);
                    this.$router.replace({ name: "secure" });
                } else {
                    console.log("The username and / or password is incorrect");
                }
            } else {
                console.log("A username and password must be present");
            }
        }
        */
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