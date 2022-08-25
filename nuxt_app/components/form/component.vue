<template>
  <div>
    <form-input-field
        v-model="model.email"
        prepend-icon="mdi-email"
        label="Email"
        type="email"
    />
    <form-input-field
        v-model="model.password"
        prepend-icon="mdi-lock"
        label="Password"
        type="password"
    />
  </div>
</template>

<script>
export default {
    props:{
        value: {
            type: Object,
            required: true
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