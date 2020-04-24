<template>
  <div>
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <input
      @input="handleInput($event.target.value)"
      class="base-field"
      :type="$attrs.field_type ? $attrs.field_type : 'text'"
      :id="$attrs.field_id"
      :value="value">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
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
