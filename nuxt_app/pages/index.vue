<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <emit-event @add="EmitEvent" />

      <br />
      <hr />
      <test-provide-and-inject />

      <hr />
      <p>how to use computed {{ filmNameComputed }}</p>

      <p>how to use function{{ fun('test') }}</p>

      <p>
        use watcher in setup let see dev tool:
        <input v-model="filmName" type="text" style="border: 1px solid grey" />
      </p>

      
      <p>Call composable fun Mouse position is at: {{ x }}, {{ y }}</p>
      <br />


      <p>this is how to use transition</p>
      <button @click="showP = !showP" style="border: 1px solid grey">
        Toggle
      </button>
      <!-- we use show of name attr to style the class in style tag at the bottom ex .show-enter-active
      but if we remove name attr we use .v-enter-active instead
      -->
      <transition name="show">
        <p v-if="showP">Hello there</p>
      </transition>
    </v-col>
  </v-row>
</template>

<script>
import {
  ref,
  watch,
  watchEffect,
  computed,
  onMounted,
} from '@nuxtjs/composition-api'
import useMouse from '@/composable/useMouse'
export default {
  name: 'IndexPage',
  // we can pass data through multi child component without using prop let see in <test-provide-and-inject> component
  provide() {
    return {
      username: 'this a provide',
    }
  },
  layout: 'customLayout',
  setup() {
    const filmName = ref('')

    // how to call composable function
    const { x, y } = useMouse()

    // ------ watcher -----
    // to watch multi param
    // watch([count, count2], ([newCount, newCount2], [oldCount, oldCount2]) => {
    watch(filmName, (newVal, oldVal) => {
      console.log(`new val: ${newVal} and old val: ${oldVal}`)
    })

    // watchEffect only get new value
    watchEffect(() => {
      console.log(`watchEffect - ${filmName.value}`)
    })

    // ----- computed -----
    const filmNameComputed = computed(() => {
      const num1 = 4
      const num2 = 3
      return num1 + num2
    })

    // ----- function -----
    const fun = (param) => {
      return 'Hello function ' + param
    }

    const EmitEvent = (param) => {
      console.log(param)
    }

    // ----- life Cycle hook -----
    onMounted(() => {
      alert('on mounted hook render')
    })

    return {
      fun,
      EmitEvent,
      x,
      y,
      filmName,
      filmNameComputed,
    }
  },
  data() {
    return { showP: false }
  },
  head() {
    return {
      title: 'Home',
    }
  }
  // watch: {
  //   filmName(newValue) {
  //     console.log('Calling API for ' + newValue)
  //   }
  // }
  // use this if we want to run watch when page loads
  // watch: {
  //   dataPropertyToWatch: {
  //     handler(newValue) {
  //       // watcher method logic
  //     },
  //     immediate: true,
  //   },
  // },
  // use this if we want to watch nested object
  // watch: {
  //   film: {
  //     handler(newValue) {
  //       console.log('Film: ' + newValue.title + ', directed by ' + newValue.director)
  //     },
  //     deep: true
  //   }
  // }
}
</script>
<style>
.show-enter-active {
  animation: shake 1s ease;
}

@keyframes shake {
  /* fade in and slide down */
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  50% {
    opacity: 1;
    transform: translateY(0px);
  }
  /* shake from right to left */
  60% {
    transform: translateX(5px);
  }
  65% {
    transform: translateX(-5px);
  }
  70% {
    transform: translateX(4px);
  }
  75% {
    transform: translateX(-4px);
  }
  80% {
    transform: translateX(3px);
  }
  85% {
    transform: translateX(-3px);
  }
  90% {
    transform: translateX(2px);
  }
  95% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>
<!-- 
v-enter-from is applied before the element enters the browser window. This is where we set the element’s starting CSS state.
v-enter-to is applied when the element enters the browser window. This is where we set the element’s ending CSS state.
v-enter-active is applied when the element is transitioning from one state to another. This is where we set the duration and easing of the transition.
 -->