<template>
  <validation-provider :rules="rules" v-slot="{ errors, classes }">
    <text-field
      v-model="inner_value"
      :class="classes"
      v-bind="$attrs"
      :value="value">
      <span class="field-error" v-show="errors.length">{{ errors[0] }}</span>
    </text-field>
  </validation-provider>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
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
