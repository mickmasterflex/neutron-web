<template>
  <label :for="fieldId"
         :class="`toggle-switch transition-colors duration-150 border border-r-2 border-b-2 rounded-lg bg-white p-1 flex flex-row justify-between cursor-pointer
                  ${isChecked === true ? 'border-green-500' : 'border-gray-500'}
                  ${isChecked === false ? 'border-red-500' : 'border-gray-500'}
                  toggle-switch-${size}`">
    <span :class="`switch switch-off
                  ${switchClasses}
                  ${isChecked === false ? 'text-white bg-red-500' : 'text-gray-700'}
                  ${size === 'sm' ? 'text-sm' : ''}`">
      <slot name="switch-off">
        <font-awesome-icon icon="ban"></font-awesome-icon>
      </slot>
    </span>
    <span :class="`switch switch-on
                  ${switchClasses}
                  ${isChecked === true ? 'text-white bg-green-500' : 'text-gray-700'}
                  ${size === 'sm' ? 'text-sm' : ''}`">
      <slot name="switch-on">
        <font-awesome-icon icon="check"></font-awesome-icon>
      </slot>
    </span>
  </label>
</template>

<script>
export default {
  data () {
    return {
      switchClasses: 'w-1/2 flex flex-row items-center justify-center font-bold select-none transition-colors duration-150'
    }
  },
  props: {
    isChecked: {
      type: Boolean
    },
    size: {
      type: String,
      default: 'lg',
      validator: function (value) {
        return ['sm', 'lg'].includes(value)
      }
    },
    fieldId: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .toggle-switch-lg {
    padding: .125rem;
    height: 38px;
    width: 80px;
  }
  .toggle-switch-sm {
    padding: 2px;
    height: 32px;
    width: 66px;
  }
  .switch {
    padding: .125rem;
    border-radius: 5px;
  }
</style>
