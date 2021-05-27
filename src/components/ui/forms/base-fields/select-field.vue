<template>
  <div class="field-group">
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div :class="$attrs.field_wrap_class">
      <div class="relative w-64">
        <loading-options v-if="$attrs.loading" :class="`${$attrs.field_class} ${field_size}`"></loading-options>
        <select
          v-else
          @input="handleInput($event.target.value)"
          class="appearance-none base-field"
          :class="`${$attrs.field_class} ${field_size}`"
          :disabled="$attrs.field_disabled"
          :id="$attrs.field_id">
          <option value="" :selected="value === '' ? 'selected' : false">----------</option>
          <option class="capitalize" :selected="option.id === value ? 'selected' : false" v-for="option in $attrs.options" :key="option.id" :value="`${option.id}`">
            <slot name="option" :option="option">{{option.name}}</slot>
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import loading from '@/components/ui/forms/base-fields/loading'

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
  },
  computed: {
    field_size () {
      return this.$attrs.field_size ? this.$attrs.field_size : 'field-lg'
    }
  },
  components: {
    'loading-options': loading
  }
}
</script>
