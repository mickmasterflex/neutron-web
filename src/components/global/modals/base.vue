<template>
  <div v-show="show" @click="close" class="modal-backdrop fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
    <div class="bg-white w-1/2 rounded-lg p-10" @click.stop>
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
