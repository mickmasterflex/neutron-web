<template>
  <div>
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <input
      @input="handleInput($event.target.value)"
      class="base-field"
      :class="$attrs.field_class"
      :type="$attrs.field_type ? $attrs.field_type : 'text'"
      :id="$attrs.field_id"
      :value="value"
      :disabled="$attrs.field_disabled">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default: ''
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
