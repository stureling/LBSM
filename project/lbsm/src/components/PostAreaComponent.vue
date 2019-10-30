<template>
    <div id="post-area">
        <b-form @submit="onSubmit">   
            <b-form-textarea
                id="text-area"
                v-model="text"
                placeholder="What's happening?"
                rows="3"
                max-rows="6"
                :change="checker"
            ></b-form-textarea>
            <span>
                <b-button :disabled="toDisable" id="post-button" type="submit" variant="primary">Post</b-button>
                <pre id="counter">Char count: {{decrementCharCount}}</pre>
            </span>
        </b-form>
    </div>
</template>

<script>
export default {
    name: "post-area",
    
    props: {
        username: String,
    },

    data() {
        return {
            toDisable: false,
            text: '',
            maxLength: 140 
        }
    },
    
    computed: {
        decrementCharCount() {
            return this.maxLength - this.text.length;
        },
        checker(){
            if (this.text.length < 1 || this.text.length > 140){
                this.toDisable = true;
            } else {
                this.toDisable = false;
            }
        },
    },

    methods: {
        async postMessage() {     
            var dataObject = this;
            var request = $.ajax({ 
            type: 'POST',
            url: "http://127.0.0.1:3000/user/" + this.username + "/post", 
            data: {
                text: this.text,
            },
            xhrFields: {withCredentials: true}
            });

            request.done(function( data ) {
                dataObject.$root.$emit("postAreaListener", data);
                dataObject.text = "";
            });

            request.fail(function (statustext) {
                dataObject.$router.replace({name: "login"});
            });
        },
        onSubmit(evt) {
            evt.preventDefault();
            
            this.postMessage();
        },
    }

}
</script>

<style>
#post-area {
    padding: 10px;
}
#counter{
    float: right;
}
#post-button {
    float:left;
    margin-left: 0%;
    margin-top: 2%;
}
</style>