<template>
  <label :for="field_id" :class="`${label_class} field-lg field-group ml-label-width font-bold p-2 mt-5 base-field flex flex-row items-center cursor-pointer`">
    <input
      @input="handleInput($event.target.checked)"
      type="checkbox"
      :id="field_id"
      :class="$attrs.field_class"
      class="mb-1"
      :checked="value">
    <span v-if="field_label" class="ml-2">{{field_label}}</span>
  </label>
</template>

<script>
export default {
  props: {
    field_label: {
      type: String
    },
    label_class: String,
    field_id: {
      type: String,
      required: true
    },
    value: {
      type: [Boolean, String]
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
  input[type="checkbox"] { @apply cursor-pointer }
  input[type="checkbox"]:only-child { @apply mx-auto block }
</style>
