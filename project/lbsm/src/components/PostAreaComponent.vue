<template>
    <div id="post-area">
        <b-form @submit="onSubmit">   
            <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="What's happening?"
                rows="3"
                max-rows="6"
                :change="checker"
            ></b-form-textarea>
            <b-button :disabled="toDisable" id="post-button" type="submit" variant="primary">Post</b-button>

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
        checker(){
            if (this.text.length < 1){
                this.toDisable = true
            } else {
                this.toDisable = false
            }
        },
    },

    /*
    computed: {
        decrementCharCount() {
            this.text
            return this.maxLength -= 1;
        },
    },
    */
    methods: {

        async postMessage() {     
            var dataObject = this
            console.log(this.username) 
            var request = $.ajax({ 
            type: 'POST',
            url: "http://127.0.0.1:3000/user/" + this.username + "/post", 
            data: {
                text: this.text,
            },
            xhrFields: {withCredentials: true}
            });

            request.done(function( data ) {
                dataObject.$root.$emit("postAreaListener", data)
                dataObject.text = ""
            });

            request.fail(function (statustext) {
                console.log("request failed with: ", statustext);
                dataObject.$router.replace({name: "login"})
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
#text-area {

}
#post-button {
    margin-left: 0%;
    margin-top: 2%;
}
</style>