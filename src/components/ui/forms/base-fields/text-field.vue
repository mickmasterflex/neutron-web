<template>
  <div class="field-group">
    <label class="field-label field-label-top" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div :class="$attrs.field_wrap_class">
      <input
        @input="handleInput($event.target.value)"
        class="field base-field"
        :class="`${$attrs.field_class} ${$attrs.field_size ? $attrs.field_size : 'field-lg'}`"
        :type="$attrs.field_type ? $attrs.field_type : 'text'"
        :id="$attrs.field_id"
        :value="value"
        :disabled="$attrs.field_disabled"
        :placeholder="$attrs.placeholder"
        ref="field">
      <slot></slot>
    </div>
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
    },
    focusOnField () {
      this.$nextTick(() => this.$refs.field.focus())
    }
  }
}
</script>
