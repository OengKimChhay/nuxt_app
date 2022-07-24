<template>
  <v-app id="inspire">
    <v-container>
      <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-form @submit.prevent="userRegister()">
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Register form</v-toolbar-title>
                </v-toolbar>
                <v-alert v-if="errorRegister" dense outlined type="error" style="margin:20px;">{{ errorRegister ?? '' }}</v-alert>
                <v-card-text>
                      <v-text-field
                          v-model="user.name"
                          :error-messages="errorsRegister.name ? errorsRegister.name[0] : ''"
                          prepend-icon="mdi-account"
                          label="Name"
                          type="text"
                          autocomplete
                      ></v-text-field>
                      <v-text-field
                          v-model="user.email"
                          :error-messages="errorsRegister.email ? errorsRegister.email[0] : ''"
                          prepend-icon="mdi-email"
                          label="Email"
                          type="email"
                          autocomplete
                      ></v-text-field>
                      <v-text-field
                          v-model="user.password"
                          :error-messages="errorsRegister.password ? errorsRegister.password[0] : ''"
                          prepend-icon="mdi-lock"
                          label="Password"
                          type="password"
                          autocomplete
                      ></v-text-field>
                </v-card-text>
                <v-card-actions >
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="pa-2" type="submit">Register</v-btn>
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
  name: 'RegisterPage',
  layout: 'customLayout',
  middleware: ['loggedIn'],
  data(){
    return{
      user:{
        name: '',
        email:'',
        password:''
      }
    }
  },
  head: {
    title: 'Register'
  },
  computed:{
    ...mapGetters('authenthication/auth',['errorsRegister','errorRegister','loading']),
  },
  methods:{
    ...mapActions('authenthication/auth',['register']),
    userRegister(){
      const formData = new FormData();
      formData.append('name', this.user.name);
      formData.append('email', this.user.email);
      formData.append('password', this.user.password);
      this.register(formData);
    }
  }
}
</script>

<style>

</style>
