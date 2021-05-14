<template>
  <modal-template :show="showModal" @close="close" modalClass="modal-lg">
    <template v-slot:header>Update Caps</template>
    <template v-slot:body>
      <lead-caps class="relative"/>
    </template>
  </modal-template>
</template>

<script>
import leadCaps from '@/components/caps/index'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      showModal: 'getShowCapsModal'
    })
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_CAPS_MODAL'
    }),
    ...mapActions({
      capStateReset: 'capStateReset'
    }),
    close () {
      this.$emit('close')
      this.closeModal()
      this.capStateReset()
    }
  },
  components: {
    'lead-caps': leadCaps
  }
}
</script>
