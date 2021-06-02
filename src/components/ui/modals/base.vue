<template>
  <transition leave-active-class="animate__animated animate__fadeOut animate__faster">
    <div v-show="show" :class="`${modalClass} ${modalPosition} inset-0 z-50 p-5 pt-10 overflow-x-scroll`">
      <transition enter-active-class="animate__animated animate__slideInDown animate__faster"
                  leave-active-class="animate__animated animate__slideOutUp animate__fast"
                  @after-leave="$emit('modal-after-leave')">
        <div v-show="show" :class="`${modalDialogClass} modal-dialog bg-white rounded-xl relative mx-auto w-full z-20`">
          <div class="modal-padding flex flex-row items-center justify-between">
            <h3 class="modal-header h2">
              <slot name="header">Modal Header</slot>
            </h3>
            <span @click="close" class="cursor-pointer text-gray-500 transition-colors duration-200 hover:text-red-500 text-4xl font-hairline leading-none px-1">&times;</span>
          </div>
          <status-bar :show="unsavedChangesInModal" icon="exclamation-triangle" color="yellow">
            <template slot="content">
              Unsaved Changes
            </template>
          </status-bar>
          <slot name="tabs"></slot>
          <div :class="`modal-padding ${modalBodyBackground} border-t-2 border-b-2 border-gray-200`">
            <slot name="body">Modal Body</slot>
          </div>
          <div class="modal-padding flex flex-row items-center justify-end space-x-2">
            <slot name="footer-default">
              <button class="btn btn-lg btn-hollow-default" @click="close">Close</button>
            </slot>
            <slot name="footer-additional"></slot>
          </div>
        </div>
      </transition>
      <transition enter-active-class="animate__animated animate__fadeIn animate__fast"
                  leave-active-class="animate__animated animate__fadeOut animate__faster">
        <div v-show="show" @click="close" :class="`${modalBackdropColor} bg-opacity-75 ${modalPosition} top-0 right-0 left-0 bottom-0 z-10`"></div>
      </transition>
    </div>
  </transition>
</template>

<script>
import statusBar from '@/components/ui/status-bar/default'
import { mapGetters } from 'vuex'

export default {
  props: {
    show: Boolean,
    allowScroll: {
      type: Boolean,
      default: false
    },
    modalClass: String,
    modalDialogClass: String,
    modalPosition: {
      type: String,
      default: 'fixed'
    },
    modalBodyBackground: {
      type: String,
      default: 'bg-gray-100'
    },
    modalBackdropColor: {
      type: String,
      default: 'bg-black-100'
    }
  },
  computed: {
    ...mapGetters({ unsavedChangesInModal: 'getChangesInModalUnsaved' })
  },
  methods: {
    close () {
      this.$emit('close')
    },
    removeOverflowHidden (bodyClassList) {
      bodyClassList.remove('overflow-hidden')
    }
  },
  watch: {
    show: function () {
      const body = document.getElementsByTagName('BODY')[0]
      if (this.show === true && this.allowScroll === false) {
        body.classList.add('overflow-hidden')
      } else {
        this.removeOverflowHidden(body.classList)
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
  destroyed () {
    this.removeOverflowHidden(document.getElementsByTagName('BODY')[0].classList)
  },
  components: {
    'status-bar': statusBar
  }
}
</script>

<style scoped>
  .modal-dialog, .modal-alert {
    max-width: 900px;
    @apply shadow-2xl;
  }
  .modal-padding {
    @apply px-8 py-6
  }
  .modal-lg .modal-dialog,
  .modal-lg .modal-alert {
    max-width: 1500px;
  }
  .modal-md .modal-dialog,
  .modal-md .modal-alert {
    max-width: 1050px;
  }
  .modal-xs .modal-dialog,
  .modal-xs .modal-alert {
    max-width: 350px;
  }
  .modal-xs .modal-padding {
    @apply px-4 py-3
  }
  .modal-xs .modal-header {
    @apply text-2xl
  }
</style>
