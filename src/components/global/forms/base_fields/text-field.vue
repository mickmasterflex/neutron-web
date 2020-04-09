<template>
  <div :class="$attrs.field_style">
    <label :for="$attrs.id">{{$attrs.label}}</label>
    <input
      v-on:input="handleInput($event.target.value)"
      class="base-field"
      :type="$attrs.type"
      :id="$attrs.id">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: null
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
