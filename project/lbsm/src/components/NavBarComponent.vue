
<template>
  <div id="nav-bar">
      <div style="background: black">
        <b-row class="header">
          <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
              <b-nav-item href="#">Home</b-nav-item>
              <!-- Navbar dropdowns -->
              <b-nav-item-dropdown text="User" right>
                <router-link to="/login" v-on:click.native="logOut()" replace>Logout</router-link> 
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-navbar>
        </b-row>
      </div>  
  </div>
</template>

<script>
export default {
    name: 'nav-bar',
    data() {
        return {};
    },
    methods: {
        async logOut() {
            var dataObject = this;
            var request = $.ajax({ 
            type: 'GET',
            url: "http://127.0.0.1:3000/logout", 
            xhrFields: {withCredentials: true}
            });

            request.done(function (data) {
                console.log(data);
            });
            
            request.fail(function (statustext) {
                console.log("JAG SA ATT DU SUGER", statustext);
                dataObject.$router.replace({name: "login"});
            });
        }
    }
}
</script>

<style>
</style>
