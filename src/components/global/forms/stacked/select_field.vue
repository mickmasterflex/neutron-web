<template>
  <div class="stacked-field">
    <label :for="field_id">{{label}}</label>
    <div class="relative w-64">
      <select
        class="appearance-none base-field"
        v-on:input="handleInput($event.target.value)"
        :id="field_id"
        :required="required">
        <option value="">----------</option>
        <option v-for="option in options" :key="option.id" :value="`${option.id}`">{{option.name}}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'field_id', 'label', 'required', 'value'],
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
