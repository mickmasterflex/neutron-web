<template>
  <validation-provider :rules="rules" :vid="$attrs.field_id" :name="$attrs.field_id" :mode="mode" v-slot="{ errors, classes }">
    <textarea-field
      v-model="inner_value"
      :class="classes"
      v-bind="$attrs"
      :value="value"
      ref="field">
      <span class="field-error" v-show="errors.length">{{ errors[0] }}</span>
    </textarea-field>
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
    },
    mode: {
      type: String,
      default: 'aggressive'
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
