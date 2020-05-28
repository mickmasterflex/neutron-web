<template>
  <div>
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div class="flex flex-row field-draggable">
      <span class="bg-blue-500 text-white px-2 rounded-l flex flex-column items-center">
        <font-awesome-icon icon="arrows-alt-v" class="pb-1"/>
      </span>
      <input
        @input="handleInput($event.target.value)"
        class="base-field rounded-l-none border-l-0"
        :class="$attrs.field_class"
        :type="$attrs.field_type ? $attrs.field_type : 'text'"
        :id="$attrs.field_id"
        :value="value"
        :disabled="$attrs.field_disabled">
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
