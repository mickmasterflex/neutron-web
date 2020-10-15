<template>
  <modal-template :show="showModal" @close="close" modalClass="modal-lg">
    <template v-slot:header>Update Caps</template>
    <template v-slot:body>
      <lead-caps :parent="capParent" :type="capType" ref="leadCaps" class="relative"></lead-caps>
    </template>
  </modal-template>
</template>

<script>
import leadCaps from '@/components/caps/index'

import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      showModal: 'getShowCapsParentModal'
    })
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_CAPS_PARENT_MODAL',
      resetCapsCalendarParams: 'RESET_CAPS_CALENDAR_PARAMS',
      resetCapsCalendarEndpoint: 'RESET_CAPS_CALENDAR_ENDPOINT',
      setCapsCalendarEndpoint: 'SET_CAPS_CALENDAR_ENDPOINT'
    }),
    close () {
      this.resetCapsCalendarParams()
      this.resetCapsCalendarEndpoint()
      this.closeModal()
    }
  },
  components: {
    'lead-caps': leadCaps
  },
  props: {
    capParent: Number,
    capType: String
  }
}
</script>
