<template>
  <div class="field-group">
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div>
      <textarea
        @input="handleInput($event.target.value)"
        class="field base-field textarea"
        :class="$attrs.field_class"
        :id="$attrs.field_id"
        :value="value"
        :disabled="$attrs.field_disabled"
        :placeholder="$attrs.placeholder"
        ref="field"/>
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
    }
  }
}
</script>

<style>
  .textarea {
    min-height: 105px;
  }
</style>
