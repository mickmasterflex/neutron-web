<template>
  <div :class="$attrs.field_style ? $attrs.field_style : 'stacked-field'">
    <label v-if="$attrs.label" :for="$attrs.id">{{$attrs.label}}</label>
    <div class="relative w-64">
      <select
        @input="handleInput($event.target.value)"
        class="appearance-none base-field"
        :id="$attrs.id">
        <option value="">----------</option>
        <option v-for="option in $attrs.options" :key="option.id" :value="`${option.id}`">{{option.name}}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: null
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}

</script>
