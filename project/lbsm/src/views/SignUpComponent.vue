<template>
    <div>
        <div>
            <h1 id="title">
                Please sign-up below!
            </h1>  
        </div>
        <div id="sign-up">
            <b-form @submit="onSubmit" v-if="show">
                <h1 id="sign-up-label">Sign-up</h1>
                
                <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter email"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group 
                    id="input-group-2" 
                    label="Your Username:" 
                    label-for="input-2"
                >
                    <b-form-input
                        id="input-2"
                        v-model="form.username"
                        type="text"
                        placeholder="Enter username"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group 
                    id="input-group-3" 
                    label="Password:" 
                    label-for="input-3"
                >
                    <b-form-input
                        id="input-3"
                        v-model="form.password"
                        type="password"
                        placeholder="Enter Password"
                        required
                    ></b-form-input>
                </b-form-group>

                <div>        
                    <h4 v-if="inDataBase" id="error">Username already taken</h4>
                    <b-button id="sign-up-button" type="submit" variant="primary">Sign-up</b-button>
                
                    <p id="already-user">Already a user? 
                        <router-link id="login-link" to="/login">Click here to login.</router-link> 
                    </p>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>

export default {
    name: 'sign-up',
    data() {
        return {    
            form: {
                email: '',
                username: '',
                password: '',
            },
            show: true,
            inDataBase: false,
        }
    },
    methods: {
        
        inDB() {
            // Reset our form values
            this.form.email = '';
            this.form.username = '';
            this.form.password = '';
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            })
            this.inDataBase = true;
        },

        async signUp() {
            var dataObject = this;
            var request = $.ajax({ 
            type: 'POST',
            url: "http://127.0.0.1:3000/register", 
            data: {
                email: this.form.email,
                username: this.form.username, 
                password: this.form.password, 
            },
            xhrFields: {withCredentials: true}
            });
            request.done(function( data ) {
                if(data === "user already in database") {
                    dataObject.inDB();
                } else {
                    dataObject.$router.replace({ name: "login" });
                }

            });
            request.fail(function( ) {
                alert("fail");
            });
        },
        
        onSubmit(evt) {
            evt.preventDefault();
            //alert(JSON.stringify(this))
            this.signUp();
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
#sign-up {
    width: 500px;
    border: 1px solid #CCCCCC;
    border-radius: 25px;
    background-color: teal;
    margin: auto;
    padding: 20px;
}

#sign-up-label {
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
#input-group-3{
    color: white;
    text-shadow: 1px 1px black;
}
#already-user {
    color: white;
    text-shadow: 1px 1px black;
}
#sign-up-button {
    color: white;
    text-shadow: 1px 1px black;
}
#error {
    padding: 30px;
    color: yellow;
    text-align: center;
    text-shadow: 1px 1px black;
}
#login-link{
    color: yellow;
}
</style>
