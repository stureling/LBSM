        <div style="background: black">
            <b-row class="header">
                <b-navbar type="dark" variant="dark">
                  <b-navbar-nav>
                    <b-nav-item href="#">Home</b-nav-item>
                    <!-- Navbar dropdowns -->
                    <b-nav-item-dropdown text="User" right>
                      <b-dropdown-item href="#">Account</b-dropdown-item>
                      <b-dropdown-item href="#">Settings</b-dropdown-item>
                      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link> 
                    </b-nav-item-dropdown>
                  </b-navbar-nav>
                </b-navbar>
            </b-row>
        </div>