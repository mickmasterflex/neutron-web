<template>
  <div>
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div class="flex flex-row field-draggable">
      <span :class="`bg-${color}-500 text-white px-2 rounded-l flex flex-column items-center`">
        <font-awesome-icon :icon="icon" class="pb-1"/>
      </span>
      <input
        @input="handleInput($event.target.value)"
        :class="`${field_class} text-${color}-600 border-${color}-500 base-field rounded-l-none border-l-0`"
        :type="$attrs.field_type ? $attrs.field_type : 'text'"
        :id="$attrs.field_id"
        :value="value"
        :disabled="$attrs.field_disabled">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default: ''
    },
    color: {
      type: String,
      default: 'gray'
    },
    icon: {
      type: String,
      default: 'arrows-alt-v'
    },
    field_class: String
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
