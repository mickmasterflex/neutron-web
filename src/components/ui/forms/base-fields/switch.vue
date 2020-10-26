<template>
  <label :for="fieldId"
         :class="`toggle-switch transition-colors duration-150 border border-r-2 border-b-2 rounded-lg bg-white p-1 flex flex-row justify-between cursor-pointer
                  ${isChecked === true ? 'border-green-500' : 'border-gray-500'}
                  ${isChecked === false ? 'border-red-500' : 'border-gray-500'}
                  toggle-switch-${size}`">
    <span :class="`switch switch-off ${isChecked === false ? 'active' : ''}`">
      <slot name="switch-off">
        <font-awesome-icon icon="ban"></font-awesome-icon>
      </slot>
    </span>
    <span :class="`switch switch-on ${isChecked === true ? 'active' : ''}`">
      <slot name="switch-on">
        <font-awesome-icon icon="check"></font-awesome-icon>
      </slot>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      required: true
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
  .toggle-switch-sm .switch {
    @apply text-sm
  }
  .switch {
    padding: .125rem;
    border-radius: 5px;
    @apply w-1/2 flex text-gray-700 flex-row items-center justify-center font-bold select-none transition-colors duration-150
  }
  .switch.active {
    @apply text-white
  }
  .switch-on.active {
    @apply bg-green-500
  }
  .switch-off.active {
    @apply bg-red-500
  }
</style>
