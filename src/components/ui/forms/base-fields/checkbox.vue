<template>
  <label :for="field_id" :class="showDisabled ? 'cursor-not-allowed' : 'cursor-pointer'">
    <font-awesome-icon v-if="indeterminate"
                       icon="minus-square"
                       class="text-yellow-500 hover:text-yellow-600"
    ></font-awesome-icon>
    <font-awesome-icon v-else-if="value"
                       icon="check-square"
                       :class="{'text-blue-300': showDisabled,
                                'text-blue-500 hover:text-blue-600': !showDisabled}"
    ></font-awesome-icon>
    <font-awesome-icon v-else
                       :icon="['far', 'square']"
                       :class="{'text-gray-300': showDisabled,
                                'text-gray-600 hover:text-gray-900': !showDisabled}"
    ></font-awesome-icon>
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
    }
  },
  computed: {
    showDisabled () {
      return this.disabled || this.disabledVisually
    }
  }
}
</script>
