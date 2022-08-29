<template>
  <div>
    <p>this is how to use emit event check console to see what's happen</p>

    <input type="text" @input="randomFun($event)" style="border:1px solid grey;">
  </div>
</template>

<script>
export default {
  name: 'TestProvide',
  layout: 'customLayout',
  setup(_props, context) { // or setup(props, {emit}){ emit('add')}
    const randomFun = (event) => {
      context.emit('add', event.target.value)
    }

    return { randomFun }
  },
  head() {
    return {
      title: 'Mapmarker',
    }
  },
  //   if we don't use setup() we can use Option API below
  //   methods() {
  //     randomFun = (event) => {
  //       this.$emit('add', event.target.value)
  //     }
  //   },
}
</script>
