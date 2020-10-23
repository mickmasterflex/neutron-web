<template functional>
  <label :for="props.for" :class="`${props.isChecked === true ? 'border-green-500' : 'border-gray-500'} ${props.isChecked === false ? 'border-red-500' : 'border-gray-500'}`"
         class="toggle-switch transition-colors duration-150 border-2 rounded-lg bg-white p-1 flex flex-row justify-between cursor-pointer">
    <span :class="`switch switch-off ${props.isChecked === false ? 'active' : ''}`">
      <slot name="switch-off">
        <font-awesome-icon icon="ban"></font-awesome-icon>
      </slot>
    </span>
    <span :class="`switch switch-on ${props.isChecked === true ? 'active' : ''}`">
      <slot name="switch-on">
        <font-awesome-icon icon="check"></font-awesome-icon>
      </slot>
    </span>
  </label>
</template>

<style scoped>
  .toggle-switch {
    padding: .125rem;
    height: 38px;
    width: 90px;
  }
  .switch {
    padding: .125rem;
    @apply w-1/2 flex text-gray-700 flex-row items-center justify-center font-bold select-none transition-colors duration-150 rounded
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
