<template>
<v-app>

    <v-bottom-navigation>
        <v-btn :to="{ name:'index' }" >
            <span>Home</span>
            <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn :to="{ name:'about' }" >
            <span>About</span>
            <!-- <v-icon>mdi-home</v-icon> -->
        </v-btn>
        <v-btn :to="{ name:'wheather' }" >
            <span>Weather App</span>
        </v-btn>
    </v-bottom-navigation>
    <v-main>
        <v-container>
          <Nuxt/>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>
