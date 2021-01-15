<template>
  <div class="relative">
    <button :class="buttonClasses" :disabled="buttonDisabled" @click="toggle">
      <slot name="button-text">Tooltip</slot>
    </button>
    <transition enter-active-class="animate__animated animate__fadeIn animate__faster" leave-active-class="animate__animated animate__fadeOutDown animate__faster">
      <div v-show="show" :style="`width: ${tooltipWidth}px`" class="tooltip-dialog absolute bg-white rounded-lg block shadow border border-gray-300 z-10">
        <h3 class="modal-header h4 font-bold text-center px-2 py-4">
          <slot name="header">Tooltip Header</slot>
        </h3>
        <div class="border-t-2 bg-gray-100 border-b-2 border-gray-200 overflow-x-scroll p-2 flex flex-row items-center justify-center">
          <slot name="body">Tooltip Body</slot>
        </div>
        <div class="flex flex-row p-2">
          <slot name="footer-default">
            <button class="btn btn-hollow-default flex-grow" @click="toggle">Close</button>
          </slot>
          <slot name="footer-additional"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    buttonClasses: {
      type: String,
      default: 'btn btn-blue'
    },
    tooltipWidth: {
      type: Number,
      default: 300
    },
    buttonDisabled: Boolean
  },
  methods: {
    toggle () {
      if (this.show) {
        this.$emit('close')
      } else {
        this.$emit('open')
      }
    }
  }
}
</script>

<style scoped>
  .tooltip-dialog {
    right: 3%;
    top: 85%
  }
</style>
