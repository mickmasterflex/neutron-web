<template>
  <label :for="field_id" class="block font-bold rounded-md bg-gray-200 text-gray-900 block p-2 pb-3 mt-3 w-64">
    <input
      v-on:input="handleInput($event.target.value)"
      type="checkbox"
      :id="field_id"
      class="mr-2">
    <span>{{label}}</span>
  </label>
</template>

<script>
export default {
  props: ['label', 'field_id', 'model', 'value'],
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
