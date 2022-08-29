<template>
<div>
  <p>this is provide and inject we can pass data from parent to child by this Note: only parent to child</p>
  <p>this is procide from parent:{{ username }}</p>
</div>
</template>

<script>
export default {
  name: 'TestProvide',
  inject: ['username'],
  layout: 'customLayout',
  head() {
    return {
      title: 'Mapmarker',
    }
  },
}
</script>
