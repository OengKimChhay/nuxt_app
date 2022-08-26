<template>
  <v-app>
    <h1>map marker</h1>
    <map-marker />
    <br />
    <!-- --------------------------------------------------------- -->
    <h1>Autocomplete Example</h1>
    <div>
      <gmap-autocomplete
        placeholder="This is a placeholder text"
        style="border: 1px solid grey; padding: 3px; width: 400px"
        :options="{
          fields: ['geometry', 'formatted_address', 'address_components'],
        }"
        @place_changed="setPlace"
      />
      <button style="border: 1px solid grey" @click="usePlace">Add</button>
    </div>
    <!-- --------------------------------------------------------------- -->
    <br />
    <h1>google map</h1>
    <button style="border:1px solid grey; width:fit-content" @click="isCluster = !isCluster" >toggle cluster</button>
    <gmap-map
      ref="propertyMap"
      :center="center"
      :zoom="zoom"
      :options="mapOptions"
      :style="{ width: '100%', height: '40vh' }"
      :map-type-id="mapTypeId"
      @click="infoWindowOpen = false"
    >
      <!-- show map cluster -->
      <gmap-cluster v-if="isCluster">
        <gmap-marker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :icon="marker.icon"
          :clickable="true"
          :draggable="false"
          @click="toggleInfoWindow(marker)"
        />
      </gmap-cluster>

      <!-- show marker -->
        <gmap-marker
          v-for="marker in markers"
          v-else
          :key="marker.id"
          :position="marker.position"
          :icon="marker.icon"
          :clickable="true"
          :draggable="false"
          @click="toggleInfoWindow(marker)"
        />

      <!-- show marker when search only -->
      <Gmap-Marker
        v-if="this.place"
        label="sdfsd"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
      ></Gmap-Marker>

      <!-- show pop up -->
      <gmap-info-window
        :options="infoWindowOptions"
        :position="infoWindowPosition"
        :opened="infoWindowOpen"
      />

      <!-- show slot -->
      <template #visible>
        <div
          style="
            bottom: 0;
            left: 0;
            background-color: #0000ff;
            color: white;
            position: absolute;
            z-index: 100;
          "
        >
          This is a slot
        </div>
      </template>
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
      mapTypeId: 'terrain',
      mapOptions: {
        // tilt:45,
        // draggingCursor:'help', // set cursor icon when dragging (help,move,no-drop ...)
        // draggableCursor: 'help', // set cursor icon when move mouse
        minZoom: 8,
        maxZoom: 18,
        zoomControl: true, // click ctrl to zoom
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
      markers: [
        {
          position: { lat: 11.610128258512377, lng: 104.8920545554986 },
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
          image:
            'https://static9.depositphotos.com/1719616/1205/i/600/depositphotos_12057489-stock-photo-sunflower-field.jpg',
          text: 'The section below lists all of the code',
        },
        {
          position: { lat: 11.549230440183884, lng: 104.84432745185725 },
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
          image:
            'https://static9.depositphotos.com/1719616/1205/i/600/depositphotos_12057489-stock-photo-sunflower-field.jpg',
          text: 'The section below lists all of the code',
        },
        {
          position: { lat: 11.549905724308342, lng: 104.89206129850976 },
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
          image:
            'https://static9.depositphotos.com/1719616/1205/i/600/depositphotos_12057489-stock-photo-sunflower-field.jpg',
          text: 'The section below lists all of the code',
        },
      ],

      infoWindowPosition: null,
      infoWindowOpen: false,
      infoWindowOptions: {
        content: '',
        pixelOffset: {
          width: 1,
          height: -40,
        },
      },

      place: null,
      isCluster: true,
    }
  },
  head() {
    return {
      title: 'Map',
    }
  },
  methods: {
    toggleInfoWindow(marker) {
      this.infoWindowPosition = marker.position
      this.infoWindowOptions.content = this.windowContent(marker)
      this.infoWindowOpen = !this.infoWindowOpen
    },

    windowContent(marker) {
      return `
              <div style="width: 180px;height:200px;">
                <img style="width:100%;" src="${marker.image}}" />
                <h5 style="margin-top:5px;">${marker.text}</h5>
              </div>
              `
    },

    setPlace(place) {
      this.place = place
    },

    usePlace() {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          },
        })

        // center map to search marker
        this.center = {
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }

        // smooth zoom when search
        this.panTo(this.center)
        this.place = null
      }
    },

    panTo(position) {
      this.$refs.propertyMap.$mapPromise.then((map) => {
        map.panTo(position)
      })
    },
  },
}
</script>
