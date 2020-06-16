<template>
  <div v-show="show" :class="`${modalClass} fixed top-0 right-0 left-0 bottom-0 z-50 p-5 pt-10 overflow-x-scroll`">
    <div class="modal-dialog bg-white rounded-lg relative mx-auto w-full z-20">
      <div class="px-8 py-6 flex flex-row items-center justify-between">
        <h3 class="h2">
          <slot name="header">Modal Header</slot>
        </h3>
        <span class="cursor-pointer text-gray-500 hover:text-red-500 text-4xl font-hairline" @click="close">&times;</span>
      </div>
      <status-bar :show="unsavedChangesInModal" icon="exclamation-triangle" color="yellow" copy="Unsaved Changes"></status-bar>
      <div class="px-8 py-6 bg-gray-100 border-t-2 border-b-2 border-gray-200">
        <slot name="body">Modal Body</slot>
      </div>
      <div class="px-8 py-6 flex flex-row items-center justify-end">
        <slot name="footer-default">
          <button class="btn btn-lg btn-hollow-default" @click="close">Close</button>
        </slot>
        <slot name="footer-additional"></slot>
      </div>
    </div>
    <div @click="close" class="modal-backdrop fixed top-0 right-0 left-0 bottom-0 z-10"></div>
  </div>
</template>

<script>
import statusBar from '@/components/ui/modals/statusBar'
import { mapGetters } from 'vuex'

export default {
  props: {
    show: Boolean,
    modalClass: String
  },
  computed: {
    ...mapGetters({ unsavedChangesInModal: 'getChangesInModalUnsaved' })
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
  },
  components: {
    'status-bar': statusBar
  }
}
</script>

<style scoped>
  .modal-backdrop {
    background: rgba(0,0,0,.75);
  }
  .modal-dialog, .modal-alert {
    max-width: 900px;
  }
  .modal-lg .modal-dialog,
  .modal-lg .modal-alert {
    max-width: 1500px;
  }
</style>
