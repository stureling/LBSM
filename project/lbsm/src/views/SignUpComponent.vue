<template>
    <div id="sign-up">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <h1>Sign Up</h1>
            
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    id="input-1"
                    v-model="email"
                    type="email"
                    placeholder="Enter email"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Username:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="username"
                    placeholder="Enter name"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Password:" label-for="input-3">
                <b-form-input
                    id="input-3"
                    v-model="password"
                    type="password"
                    placeholder="Enter Password"
                    required
                ></b-form-input>
            </b-form-group>

            <p v-if="inDB"> The user is already in database </p>
            
            <div>        
                <b-button type="submit" variant="primary">Sign-up</b-button>
            
                <p>Already a user? 
                    <router-link to="/login">Click here to login.</router-link> 
                </p>
            </div>
            <!--
            <b-button type="reset" variant="danger">Reset</b-button>
            -->
        </b-form>
  </div>



        <!--
        <form @submit.prevent="submit">
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
            
            
            <div class="form-group" :class="{ 'form-group--error': $v.form.email.$error }">
                <label class="form__label">Email</label>
                <input class="form__input" type="text" v-model.trim="$v.form.email.$model"/>
            </div>
            <div class="error" v-if="!$v.form.email.required">Email is required</div>
            <div class="error" v-if="!$v.form.email.minLength">Email must have at least {{$v.form.email.$params.minLength.min}} letters.</div>
            
            <div class="form-group" :class="{ 'form-group--error': $v.form.username.$error }">
                <label class="form__label">Username</label>
                <input class="form__input" type="text" v-model.trim="$v.form.username.$model"/>
            </div>
            <div class="error" v-if="!$v.form.username.required">Username is required</div>
            <div class="error" v-if="!$v.form.username.minLength">Username must have at least {{$v.form.username.$params.minLength.min}} letters.</div>
            
            <div class="form-group" :class="{ 'form-group--error': $v.form.password.$error }">
                <label class="form__label">Password</label>
                <input class="form__input" type="text" v-model.trim="$v.form.password.$model"/>
            </div>
            <div class="error" v-if="!$v.form.password.required">Password is required</div>
            <div class="error" v-if="!$v.form.password.minLength">Password must have at least {{$v.form.password.$params.minLength.min}} letters.</div>
            
            
            
            <button class="button" type="submit" :disabled="submitStatus === 'PENDING' ">Submit!</button>
            
            
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
            <button type="button" v-on:click="signUp()">Sign up</button>
            
        </form>
        -->

</template>

<script>

import { required, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'sign-up',
    data() {
        return {    
            /*
            input: {        
                email: '',
                username: '',
                password: '',
            },
            */
            email: '',
            username: '',
            password: '',
            submitStatus: null,
            show: true,
        }
    },

    validations: {
        form: {
            email: {
                required,
                minLength: minLength(12)
            }, 

            username: {
                required,
                minLength: minLength(4)
            },

            password: {
                required,
                minLength: minLength(8)
            }, 
    
        }
    },
    methods: {
        
        inDB(bool) {
            // Reset our form values
            this.email = ''
            this.username = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
            return bool
        },

        async signUp() {
            var dataObject = this
            var request = $.ajax({ 
            type: 'POST',
            url: "http://127.0.0.1:3000/register", 
            data: {
                username: this.username, 
                password: this.password, 
                email: this.email,
            },
            xhrFields: {withCredentials: true}
            });
            request.done(function( data ) {
                console.log(data);
                if(data === "user already in database") {
                    dataObject.inDB(true);
                } else {
                    dataObject.$router.replace({ name: "login" });
                }
                console.log("The username and / or password is incorrect");

            });
            request.fail(function( ) {
                alert("fail");
            });
        },
        
        /*
        submit() {
            console.log('submit!')
            
            console.log(this.$v.$invalid)
    
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                this.signUp();
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                this.submitStatus = 'OK'
                }, 500);
            }
        },
        */

        onSubmit(evt) {
            evt.preventDefault()
            //alert(JSON.stringify(this))
            this.signUp();
        },
        
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.email = ''
            this.username = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
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
