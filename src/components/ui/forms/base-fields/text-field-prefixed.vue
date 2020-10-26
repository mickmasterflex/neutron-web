<template>
  <div class="field-group">
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div :class="`flex flex-row ${prefix_group_class}`">
      <span :class="`w-4 bg-${color}-500 text-white rounded-l flex flex-column items-center justify-center`">
        <font-awesome-icon :icon="icon" class="pb-1"></font-awesome-icon>
      </span>
      <input
        @input="handleInput($event.target.value)"
        :class="`${field_class} text-${color}-600 border-${color}-500 base-field rounded-l-none border-l-0`"
        :type="$attrs.field_type ? $attrs.field_type : 'text'"
        :id="$attrs.field_id"
        :value="value"
        :disabled="$attrs.field_disabled"
        :placeholder="$attrs.placeholder">
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
    field_class: String,
    prefix_group_class: String
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
