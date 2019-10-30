<template>
    <div>
        <h1 id="title">Welcome to LBSM!</h1>
        <div id="login">
        <b-form @submit="onSubmit" v-if="show">
            <h1 id="login-label">Login</h1>
            
            <b-form-group id="input-group-1" label="Your Username:" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="form.username"
                    type="text"
                    placeholder="Enter username"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    placeholder="Enter Password"
                    required
                ></b-form-input>
            </b-form-group>
 
            <div>       
                <h4 v-if="failure" id="error">Wrong username or password! Please try again</h4>
                <b-button id="login-button" type="submit" variant="primary">Login</b-button>
            
                <p id="non-user">Not a user? 
                    <router-link id="signup-link" to="/sign-up">Click here to sign-up.</router-link> 
                </p>
            </div>
        </b-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            show: true,
            failure: false,
        }
    },
    methods: {
        wrongInput() {
            // Reset our form values
            this.form.username = '';
            this.form.password = '';
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            })
            this.failure = true;
        },
        async login() {

            var dataObject = this;

            var request = $.ajax({ 
            type: 'POST',
            url: "http://127.0.0.1:3000/login", 
            data: {
                username: this.form.username, 
                password: this.form.password, 
            },
            xhrFields: {withCredentials: true}
            });

            request.done(function( data ) {
                if(data.username == dataObject.form.username) {
                    dataObject.$router.push({ name: "home" });
                }
            });

            request.fail(function() {
                dataObject.wrongInput();
            });
        },
        
        onSubmit(evt) {
            evt.preventDefault();
            this.login();
        },
    }
}
</script>

<style scoped>
#title {
    width: 500px;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 100px;
    padding: 20px;
    text-align: center;
    color: yellow;
    text-shadow: 2px 2px black;

}
#login {
    width: 500px;
    border: 1px solid #CCCCCC;
    border-radius: 25px;
    background-color: teal;
    margin: auto;
    padding: 20px;
}
#login-label {
    color:yellow;
    text-shadow: 2px 2px black;
}
#input-group-1{
    color: white;
    text-shadow: 1px 1px black;
}

#input-group-2{
    color: white;
    text-shadow: 1px 1px black;
}
#non-user {
    color: white;
    text-shadow: 1px 1px black;
}
#login-button {
    color: white;
    text-shadow: 1px 1px black;
}
#signup-link{
    color: yellow;
}
#error {
    padding: 30px;
    color: yellow;
    text-align: center;
    text-shadow: 1px 1px black;
}
</style>
