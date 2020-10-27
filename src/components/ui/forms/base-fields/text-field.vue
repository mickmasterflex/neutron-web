<template>
  <div class="field-group">
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div>
      <input
        @input="handleInput($event.target.value)"
        class="field base-field"
        :class="$attrs.field_class"
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
