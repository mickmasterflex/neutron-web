<template>
  <span class="switch-side w-1/2 flex flex-row items-center justify-center font-bold select-none transition-colors duration-150"
        :class="`${size === 'sm' ? 'text-sm' : ''}
        ${active ? `text-white bg-${color}-500` : 'text-gray-700'}`">
    <slot>
      <font-awesome-icon icon="check"></font-awesome-icon>
    </slot>
  </span>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean
    },
    size: {
      type: String,
      default: 'lg',
      validator: function (value) {
        return ['sm', 'lg'].includes(value)
      }
    },
    color: {
      default: 'green',
      validator: (value) => {
        return [
          'blue',
          'gray',
          'green',
          'indigo',
          'orange',
          'red',
          'turquoise',
          'yellow'
        ].includes(value)
      }
    }
  }
}
</script>

<style scoped>
  .switch-side {
    padding: .125rem;
    border-radius: 5px;
  }
</style>
