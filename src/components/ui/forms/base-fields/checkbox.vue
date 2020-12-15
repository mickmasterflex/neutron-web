<template>
  <label :for="field_id" :class="showDisabled ? 'cursor-not-allowed' : 'cursor-pointer'">
    <slot name="checkbox">
      <font-awesome-icon v-if="indeterminate"
                         icon="minus-square"
                         :class="showDisabled ?
                                 `text-${indeterminateColor}-300` :
                                 `text-${indeterminateColor}-500 hover:text-${indeterminateColor}-600`"
      ></font-awesome-icon>
      <font-awesome-icon v-else-if="value"
                         icon="check-square"
                         :class="showDisabled ?
                                `text-${checkedColor}-300` :
                                `text-${checkedColor}-500 hover:text-${checkedColor}-600`"
      ></font-awesome-icon>
      <font-awesome-icon v-else
                         :icon="['far', 'square']"
                         :class="showDisabled ?
                                `text-${uncheckedColor}-300` :
                                `text-${uncheckedColor}-600 hover:text-${uncheckedColor}-900`"
      ></font-awesome-icon>
    </slot>
    <input
      ref="checkbox"
      @input="$emit('input', $event.target.checked)"
      type="checkbox"
      :id="field_id"
      class="hidden"
      :checked="value"
      :indeterminate.prop="indeterminate"
      :disabled="disabled">
    <span class="ml-2" :class="label_class">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    label_class: {
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
    disabledVisually: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean
    },
    uncheckedColor: {
      default: 'gray',
      type: String
    },
    checkedColor: {
      default: 'blue',
      type: String
    },
    indeterminateColor: {
      default: 'yellow',
      type: String
    }
  },
  computed: {
    showDisabled () {
      return this.disabled || this.disabledVisually
    }
  }
}
</script>
