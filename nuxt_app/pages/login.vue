<template>
  <v-app id="inspire">
    <v-container>
      <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-form @submit.prevent="userLogin()" ref="formLogin">
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-alert v-if="error" dense outlined type="error" style="margin:20px;">{{ error ?? '' }}</v-alert>
                <v-card-text>
                  <!-- form input field is an component -->
                      <form-component v-model=user />
                </v-card-text>
                <v-card-actions >
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="pa-2" type="submit">Login</v-btn>
                </v-card-actions>
                <v-progress-linear v-if="loading" active indeterminate color="light-blue darken-4 accent-4"></v-progress-linear>
              </v-card>
            </v-form>
          </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'AboutPage',
  layout: 'customLayout',
  middleware: ['loggedIn'],
  data(){
    return{
      user:{}
    }
  },
  head: {
    title: 'Login'
  },
  computed:{
    ...mapGetters('authenthication/auth',['errors','error','loading']),
  },
  methods:{
    ...mapActions('authenthication/auth',['login']),
    userLogin(){
      console.log(this.user)
      // const formData = new FormData();
      // formData.append('email', this.user.email);
      // formData.append('password', this.user.password);
      // this.login(formData);
    }
  }
}
</script>

<style>

</style>
