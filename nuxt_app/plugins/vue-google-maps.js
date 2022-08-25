import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

Vue.component('GmapCluster', GmapCluster)
Vue.component('GmapMap', VueGoogleMaps.Map);
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyC8emx-ADauGmRO6KxE1f5xz2gfti3Icdk',
      libraries: "places"
    }
})