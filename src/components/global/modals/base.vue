<template>
  <div v-show="show" @click="close" class="modal-backdrop fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
    <div class="bg-white w-1/2 rounded-lg p-10" @click.stop>
      <div class="flex flex-row items-center justify-between mb-8">
        <h3 class="h2 inline">
          <slot name="header">Modal Header</slot>
        </h3>
        <span class="cursor-pointer text-gray-500 hover:text-red-500 text-xl" @click="close">&times;</span>
      </div>
      <slot name="body">Modal Body</slot>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
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

<style>
  .modal-backdrop {
    background: rgba(0,0,0,.75);
  }
</style>
