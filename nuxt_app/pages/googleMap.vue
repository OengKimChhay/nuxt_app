<template>
  <v-app >
    <h3>map marker</h3>
    <map-marker />
    <hr>
    <h3>google map</h3>
        <gmap-map 
        :center="center"
        :zoom="zoom"
        :options="mapOptions"
        :style="{ width: '100%', height: '40vh' }"
        :map-type-id="mapTypeId"
        map-style-id="roadmap"
        @click="infoWindowOpen=false">

          <gmap-marker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :icon="marker.icon"
          :clickable="true"
          :draggable="false"
          @click="toggleInfoWindow(marker)"
          />

          <gmap-info-window 
          :options="infoWindowOptions"
          :position="infoWindowPosition" 
          :opened="infoWindowOpen"/>

	    </gmap-map>
  </v-app>
</template>

<script>
export default {
  name: 'GoogleMap',
  layout: 'customLayout',
  data() {
    return {
      zoom: 12,
      center: { lat: 11.556644531351306, lng: 104.9282384649147 },
      mapTypeId: "terrain"
      ,
      mapOptions: {
        // tilt:45,
        // draggingCursor:'help', // set cursor icon when dragging (help,move,no-drop ...)
        // draggableCursor: 'help', // set cursor icon when move mouse
        minZoom: 8,
        maxZoom: 18,
        zoomControl: true,  // click ctrl to zoom
        zoomControlOptions: { position: 3 },
        mapTypeControl: true, // enables or disables the map type (Map, Satellite)
        mapTypeControlOptions: { position: 3 },
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUI: false,
        // draggable: false   // can drag or not
      },
      markers:[
        { 
          position: { lat: 11.610128258512377, lng: 104.8920545554986 },
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png' ,
          image: 'https://static9.depositphotos.com/1719616/1205/i/600/depositphotos_12057489-stock-photo-sunflower-field.jpg',
          text: 'The section below lists all of the code'
        },
        { 
          position: { lat: 11.549230440183884, lng:104.84432745185725 } ,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
          image: 'https://static9.depositphotos.com/1719616/1205/i/600/depositphotos_12057489-stock-photo-sunflower-field.jpg',
          text: 'The section below lists all of the code' 
        },
        { 
          position: { lat: 11.549905724308342,lng: 104.89206129850976 } ,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
          image: 'https://static9.depositphotos.com/1719616/1205/i/600/depositphotos_12057489-stock-photo-sunflower-field.jpg',
          text: 'The section below lists all of the code' 
        }
      ],

      infoWindowPosition: null,
      infoWindowOpen: false,
      infoWindowOptions: {
        content: '',
        pixelOffset: {
          width: 1,
          height: -40
        }
      },

    };
  },
  head() {
    return{
      title: 'Map'
    }
  },
  methods: {
    toggleInfoWindow(marker) {
      
      this.infoWindowPosition = marker.position
      this.infoWindowOptions.content = this.windowContent(marker)
      this.infoWindowOpen = !this.infoWindowOpen
      
      },
    windowContent(marker){
      return `
              <div style="width: 180px;height:200px;">
                <img style="width:100%;" src="${marker.image}}" />
                <h5 style="margin-top:5px;">${marker.text}</h5>
              </div>
              `
    }
  }
}
</script>
