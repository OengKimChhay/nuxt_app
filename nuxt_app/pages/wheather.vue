<template>
  <div class="mt-5" style="max-width:500px; margin:auto;">
    <h2 class="text-center">Weather App</h2>
      <v-text-field @keyup="changeCountry()" v-model="country" label="Search Contry" solo placeholder="Search country" ></v-text-field>
      <v-card :loading="getLoading" class="mx-auto" max-width="400" >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5" v-if="weather.sys">
            {{ weather.name ?? '' }}, {{ weather.sys.country }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="weather.weather">{{ convertDate(weather.dt) }} | {{ weather.weather[0].description ?? '' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="text-h2" cols="6" v-if="weather.main">
            {{ convertTem(weather.main.temp) }}&deg;C
          </v-col>
          <v-col cols="6">
            <v-img :src="icon" alt="Sunny image" width="92" ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-subtitle v-if="weather.main">Feels like {{ convertTem(weather.main.feels_like) }}&deg;C</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-subtitle v-if="weather.main">Max temp {{ convertTem(weather.main.temp_max) }}&deg;C</v-list-item-subtitle>
        <v-list-item-subtitle v-if="weather.main">Min temp {{ convertTem(weather.main.temp_min) }}&deg;C</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-fan</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle v-if="weather.wind">{{ weather.wind.speed }} m/s</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-water</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle v-if="weather.main">{{weather.main.humidity}} %</v-list-item-subtitle>
      </v-list-item>

  </v-card>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  name: 'WeatherApp',
  layout: 'BaseLayout',
  data(){
    return{
      country:'cambodia'
    }
  },
  head: {
    titleTemplate: 'weather'
  },
  computed:{
    ...mapGetters('weather/weather',['weather','getLoading']),
    icon(){
      return this.weather.weather ? `https://api.openweathermap.org/img/w/${this.weather.weather[0].icon}.png` :'';
    }
  },
  created(){
    this.getWeather(this.country);

  },
  methods:{
    ...mapActions('weather/weather',['getWeather']),
    changeCountry(){
      if(this.country !== ''){
        this.getWeather(this.country);
      }else{
        this.getWeather('cambodia');
      }
    },
    convertTem(tem){
      return Math.round(tem - 273.15);
    },
    convertDate(datetime){
      const date = new Date(datetime * 1000);
      const options = {
        weekday: 'short', // "narrow","short", "long"
        year: 'numeric', // "numeric", "2-digit".
        month: 'short', // "numeric", "2-digit", "narrow", "short", "long".
        day: 'numeric', // "numeric", "2-digit".
        hour: '2-digit', // "numeric", "2-digit".
        minute: '2-digit', // "numeric", "2-digit".
        timeZone: 'Asia/Phnom_Penh'
        };
      return date.toLocaleDateString("en-US",options);
    }
  }
}
</script>

<style>

</style>
