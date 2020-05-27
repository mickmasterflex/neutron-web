<template>
  <div v-show="show" @click="close" class="modal-backdrop fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
    <div class="bg-white modal-box rounded-lg mx-5" @click.stop>
      <div class="px-8 py-6 flex flex-row items-center justify-between">
        <h3 class="h2 inline">
          <slot name="header">Modal Header</slot>
        </h3>
        <span class="cursor-pointer text-gray-500 hover:text-red-500 text-4xl font-hairline" @click="close">&times;</span>
      </div>
      <div class="px-8 py-6 bg-gray-100 border-t-2 border-b-2 border-gray-200">
        <slot name="body">Modal Body</slot>
      </div>
      <div class="px-8 py-6 flex flex-row items-center justify-end">
        <slot name="footer-default">
          <button class="btn btn-lg btn-hollow-default mr-2" @click="close">Close</button>
        </slot>
        <slot name="footer-additional"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  created () {
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && this.show) {
        this.close()
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  }
}
</script>

<style scoped>
  .modal-backdrop {
    background: rgba(0,0,0,.75);
  }
  .modal-box {
    width: 100%;
    max-width: 900px;
  }
</style>
