<template>
    <v-text-field
        v-model="model"
        :prepend-icon="prependIcon"
        :error-messages="message"
        :label="label"
        :type="type"
    />
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Number],
            default: null
        },
        prependIcon: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        type: {
            type: [String, Number],
            default: 'test'
        }
    },
    computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>

</style>