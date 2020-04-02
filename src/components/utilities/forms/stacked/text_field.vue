<template>
  <div class="stacked-field">
    <label :for="field_id">{{label}}</label>
    <input
      v-on:input="handleInput($event.target.value)"
      class="base-field"
      type="text"
      :id="field_id"
      :required="required">
  </div>
</template>

<script>
export default {
  props: ['field_id', 'label', 'required', 'value'],
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
