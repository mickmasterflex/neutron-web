<template>
  <div v-show="show" class="fixed top-0 right-0 left-0 bottom-0 z-50 overflow-x-scroll">
    <div class="bg-white modal-dialog rounded-lg relative mx-5 z-20">
      <div class="px-8 py-6 flex flex-row items-center justify-between">
        <h3 class="h2">
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
    <div @click="close" class="modal-backdrop fixed top-0 right-0 left-0 bottom-0 z-10"></div>
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
  watch: {
    show: function () {
      const body = document.getElementsByTagName('BODY')[0]
      if (this.show === true) {
        body.classList.add('overflow-hidden')
      } else {
        body.classList.remove('overflow-hidden')
      }
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
  .modal-dialog {
    width: 100%;
    max-width: 900px;
    margin: 30px auto;
  }
</style>
