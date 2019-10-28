<template>
    <div>
        <h1 id="title">
                Welcome to lbsm!
        </h1>
        <div id="login">
        <b-form @submit="onSubmit" v-if="show">
            <h1>Login</h1>
            
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
                <p v-if="failure" class="error"> Wrong username or password! Please try again</p>
                <b-button type="submit" variant="primary">Login</b-button>
            
                <p>Not a user? 
                    <router-link to="/sign-up">Click here to sign-up.</router-link> 
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
            this.form.username = ''
            this.form.password = ''
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
            this.failure = true
        },
        async login() {

            var dataObject = this

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
            //alert(JSON.stringify(this))
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

}
#login {
    width: 500px;
    border: 1px solid #CCCCCC;
    border-radius: 25px;
    background-color: #FFFFFF;
    margin: auto;
    padding: 20px;
}
.error {
    border:  20px solid red;
    padding: 30px;
}
</style>
