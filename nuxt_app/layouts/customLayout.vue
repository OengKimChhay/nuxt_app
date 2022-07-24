<template>
<v-app>

    <v-bottom-navigation>
        <v-btn :to="{ name:'index' }" >
            <span>Home</span>
            <v-icon>mdi-home-variant</v-icon>
        </v-btn>
        <v-btn v-if="loggedIn" :to="{ name:'users' }" >
            <span>Users</span>
            <v-icon>mdi-account-multiple</v-icon>
        </v-btn>
        <v-btn :to="{ name:'wheather' }">
            <span>Weather App</span>
            <v-icon>mdi-weather-snowy-rainy</v-icon>
        </v-btn>
        <v-btn v-if="!loggedIn" :to="{ name:'login' }" >
            <span>Login</span>
            <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn v-if="!loggedIn" :to="{ name:'register' }" >
            <span>Register</span>
            <v-icon>mdi-account-plus</v-icon>
        </v-btn>

        <v-menu v-if="loggedIn" open-on-hover top offset-y >
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark v-bind="attrs" v-on="on" >
              <span>{{ user ? user.result.user.name : ''}}</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="userLogout()">
              <v-list-item-title>
                  <span>Logout</span>
                  <v-icon>mdi-logout</v-icon>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-bottom-navigation>
      <v-main>
        <v-container>
          <Nuxt/>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name:'customLayout',
  head(){
    return{
      titleTemplate : '%s | Nuxt'
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn;
    },
    user() {
      return this.$auth.user;
    }
  },
  methods:{
    ...mapActions('authenthication/auth',['logout']),
    async userLogout(){
      await this.logout();
    }
  }
}
</script>

<style>
.v-btn:not(.v-btn--round).v-size--defaultP{
  height:auto;
}
</style>
