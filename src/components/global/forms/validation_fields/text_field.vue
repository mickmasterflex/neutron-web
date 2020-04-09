<template>
  <validation-provider :rules="rules" v-slot="{ errors, classes }">
    <base-text-field v-model="innerValue" :class="classes" v-bind="$attrs"></base-text-field>
    <span class="field-error">{{ errors[0] }}</span>
  </validation-provider>
</template>

<script>
import baseTextField from '@/components/global/forms/base_fields/text-field'

export default {
  components: {
    'base-text-field': baseTextField
  },
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
