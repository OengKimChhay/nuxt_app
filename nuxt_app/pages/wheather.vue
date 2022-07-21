<template>
  <div class="mt-5" style="max-width:500px; margin:auto;">
    <h2 class="text-center">Weather App</h2>
    <v-autocomplete v-model="country" :items="countryList"  auto-select-first clearable deletable-chips dense solo @change="changeCountry()" placeholder="Please select a country"></v-autocomplete>
      <v-card :loading="getLoading" class="mx-auto" max-width="400" >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title v-if="weather.sys" class="text-h5" >
            {{ weather.name ?? '' }}, {{ weather.sys.country }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="weather.weather">{{ convertDate(weather.dt) }} | {{ weather.weather[0].description ?? '' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col v-if="weather.main" class="text-h2" cols="6">
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
      country:'cambodia',
      countryList:[
        "Afghanistan",
        "Åland Islands",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "British",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos Islands",
        "Colombia",
        "Comoros",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom of Great Britain and Northern Ireland",
        "United States Minor Outlying Islands",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Viet Nam",
        "Virgin Islands",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe"
      ]
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
      if(this.country){
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
