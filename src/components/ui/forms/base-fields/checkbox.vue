<template>
  <label :for="field_id" :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'">
    <font-awesome-icon v-if="indeterminate" icon="minus-square" class="text-yellow-500 hover:text-yellow-600"></font-awesome-icon>
    <font-awesome-icon v-else-if="value" icon="check-square" :class="disabled ? 'text-blue-300' : 'text-blue-500 hover:text-blue-600'"></font-awesome-icon>
    <font-awesome-icon v-else :icon="['far', 'square']" :class="disabled ? 'text-gray-300' : 'text-gray-600 hover:text-gray-900'"></font-awesome-icon>
    <input
      ref="checkbox"
      @input="$emit('input', $event.target.checked)"
      type="checkbox"
      :id="field_id"
      class="hidden"
      :class="$attrs.field_class"
      :checked="value"
      :indeterminate.prop="indeterminate"
      :disabled="disabled">
    {{field_label}}
  </label>
</template>

<script>
export default {
  props: {
    field_label: {
      type: String
    },
    field_id: {
      type: [String, Number],
      required: true
    },
    value: {
      type: [Boolean, String]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean
    }
  }
}
</script>
