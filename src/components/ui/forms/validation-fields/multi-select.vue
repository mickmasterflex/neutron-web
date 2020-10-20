<template>
  <validation-provider :rules="rules" :vid="$attrs.field_id" :name="$attrs.field_id" :mode="mode" v-slot="{ errors, classes }">
    <multi-select-field :options="options" v-model="inner_value" :class="classes" v-bind="$attrs">
      <span class="field-error" v-show="errors.length">{{ errors[0] }}</span>
    </multi-select-field>
  </validation-provider>
</template>

<script>
import baseMultiSelect from '@/components/ui/forms/base-fields/multi-select'

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
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
  },
  components: {
    'multi-select-field': baseMultiSelect
  }
}
</script>
