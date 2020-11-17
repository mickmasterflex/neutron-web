<template>
  <label :for="field_id"
         :class="`transition-colors duration-150 border border-r-2 border-b-2 rounded-lg bg-white p-1 flex flex-row justify-between cursor-pointer
                  ${is_on === true ? `border-${on_color}-500` : 'border-gray-500'}
                  ${is_on === false ? `border-${off_color}-500` : 'border-gray-500'}
                  switch-${size}`">
    <switch-side :active="!is_on" :color="off_color">
      <slot name="switch-off">
        <font-awesome-icon icon="ban"></font-awesome-icon>
      </slot>
    </switch-side>
    <switch-side :active="is_on" :color="on_color"></switch-side>
  </label>
</template>

<script>
import switchSide from '@/components/ui/switch/side/'

export default {
  props: {
    is_on: {
      type: Boolean
    },
    on_color: {
      default: 'green'
    },
    off_color: {
      default: 'red'
    },
    size: {
      type: String,
      default: 'lg',
      validator: function (value) {
        return ['sm', 'lg'].includes(value)
      }
    },
    field_id: {
      type: String
    }
  },
  components: {
    'switch-side': switchSide
  }
}
</script>

<style scoped>
  .switch-lg {
    padding: .125rem;
    height: 38px;
    width: 80px;
  }
  .switch-sm {
    padding: 2px;
    height: 32px;
    width: 66px;
  }
</style>
