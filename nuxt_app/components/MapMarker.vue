<template>
        <div style="display:flex;">
          <gmap-map 
          :center="center"
          :zoom="zoom"
          :options="mapOptions"
          :style="{ width: '50%', height: '300px' }"
          map-style-id="roadmap"
          @click=mark($event)>

            <gmap-marker
            :position="centerMark"
            :clickable="true"
            :draggable="true"
            />

          </gmap-map>
          <div style="margin-left:10px;width:50%;">
            <label for="lat" style="display:block;">Lat Lng</label>
            <input  id="lat" v-model="latLng" type="text" style="height:30px;border:1px solid grey;width:100%;">
          </div>
        </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  layout: 'customLayout',
  data() {
    return {
      zoom: 12,
      center: { lat: 11.556644531351306, lng: 104.9282384649147 },
      centerMark: this.center,
      latLng:'',
      mapTypeId: "roadmap"
      ,
      mapOptions: {
        minZoom: 8,
        maxZoom: 18,
        zoomControl: true,  // click ctrl to zoom,
        draggableCursor: 'crosshair',
        zoomControlOptions: { position: 3 },
        mapTypeControl: false, // enables or disables the map type (Map, Satellite)
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false,
      },
    };
  },
  head() {
    return{
      title: 'Mapmarker'
    }
  },
  methods:{
    mark(event){
      this.centerMark = {lat: event.latLng.lat(), lng: event.latLng.lng() }
      this.latLng = event.latLng.lat()+', '+event.latLng.lng()
    }
  }
}
</script>
