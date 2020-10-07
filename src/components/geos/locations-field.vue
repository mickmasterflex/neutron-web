<template>
  <v-textarea-field
    field_id="locations"
    ref="locationField"
    field_label="Locations"
    rules="required"
    v-model="inner_value"
    placeholder="Enter multiple postal codes, or abbreviated states. Separate by return or comma. ie: 84104, UT, 90210, UT, TX"></v-textarea-field>
</template>

<script>
export default {
  data: () => ({
    inner_value: ''
  }),
  watch: {
    // Handles internal model changes.
    inner_value (newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value (newVal) {
      this.inner_value = newVal
    }
  },
  created () {
    if (this.value) {
      this.inner_value = this.value
    }
  }
}
</script>
