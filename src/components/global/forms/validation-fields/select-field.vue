<template>
  <validation-provider :rules="rules" v-slot="{ errors, classes }">
    <select-field v-model="innerValue" :class="classes" v-bind="$attrs"></select-field>
    <span class="field-error">{{ errors[0] }}</span>
  </validation-provider>
</template>

<script>
export default {
  props: {
    value: {
      type: null
    },
    rules: {
      type: [Object, String],
      default: ''
    }
  },
  data: () => ({
    innerValue: ''
  }),
  watch: {
    // Handles internal model changes.
    innerValue (newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value (newVal) {
      this.innerValue = newVal
    }
  },
  created () {
    if (this.value) {
      this.innerValue = this.value
    }
  }
}
</script>
