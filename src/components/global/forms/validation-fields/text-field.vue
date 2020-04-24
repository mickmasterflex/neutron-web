<template>
  <validation-provider :rules="rules" v-slot="{ errors, classes }">
    <text-field
      v-model="inner_value"
      :class="classes"
      v-bind="$attrs"
      :value="value"></text-field>
    <span class="field-error">{{ errors[0] }}</span>
  </validation-provider>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: ''
    }
  },
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
