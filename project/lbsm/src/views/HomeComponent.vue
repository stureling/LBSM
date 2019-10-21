<template>
    <div>
        <div>
            <NavBarComponent/>
        </div>
        <div id="home">        
            <h1>Secure Area</h1>
            <p>
                {{data}}
            </p>
        </div>
           <PostAreaComponent/>
        <div>

        </div>
    </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue'
import PostAreaComponent from '@/components/PostAreaComponent.vue'

export default {
    name: 'home',
 
    components: {
        NavBarComponent,
        PostAreaComponent,
    },

    data() {
        return {
            data: '',
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            var dataObject = this;
            var request = $.ajax({ 
            type: 'GET',
            url: "http://127.0.0.1:3000/home", 
            xhrFields: {withCredentials: true}
            });

            request.done(function (data) {
                console.log(data);
                dataObject.data = data
            });
            
            request.fail(function (statustext) {
                console.log("JAG SA ATT DU SUGER", statustext);
                dataObject.$router.replace({name: "login"})
            });
        }
    }
}
</script>

<style scoped>
#home {
    margin-left: 1%;
    margin-top: 1%;
}
</style>

