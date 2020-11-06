<template>
  <div class="field-group">
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div :class="`flex flex-row relative ${field_wrap_class}`">
      <span :class="`${color === 'none' ? 'w-6' : 'w-4'} ${prefixColorClasses} absolute top-0 left-0 h-base-field rounded-l flex flex-column items-center justify-center`">
        <font-awesome-icon :icon="icon" :class="color !== 'none' ? 'pb-1' : ''"></font-awesome-icon>
      </span>
      <div>
        <input
          @input="handleInput($event.target.value)"
          :class="`${$attrs.field_class} ${$attrs.field_size ? $attrs.field_size : 'field-lg'} ${inputColorClasses} base-field pl-6`"
          :type="$attrs.field_type ? $attrs.field_type : 'text'"
          :id="$attrs.field_id"
          :value="value"
          :disabled="$attrs.field_disabled"
          :placeholder="$attrs.placeholder"
          ref="field">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default: ''
    },
    color: {
      type: String,
      default: 'gray'
    },
    icon: {
      type: String,
      default: 'arrows-alt-v'
    },
    field_wrap_class: String
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  },
  computed: {
    prefixColorClasses () {
      if (this.color !== 'none') {
        return `bg-${this.color}-500 text-white`
      }
      return 'text-gray-500'
    },
    inputColorClasses () {
      if (this.color !== 'none') {
        return `text-${this.color}-600 border-${this.color}-500`
      }
      return ''
    }
  }
}
</script>
