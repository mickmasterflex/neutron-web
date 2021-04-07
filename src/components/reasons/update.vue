<template>
  <reason-modal
    :modal-visible="modalVisible"
    :loading="loading"
    :submit-action="updateReason"
    :close-modal="closeModalAndReset"
    modal-purpose="Update"
  ></reason-modal>
</template>

<script>
import reasonModal from '@/components/reasons/modal'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'reason-modal': reasonModal
  },
  computed: {
    ...mapGetters({
      modalVisible: 'getShowUpdateReasonModal',
      loading: 'getReasonsPutLoading'
    })
  },
  methods: {
    ...mapActions({
      updateReason: 'updateReason'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_REASON',
      closeModal: 'CLOSE_UPDATE_REASON_MODAL'
    }),
    closeModalAndReset () {
      this.closeModal()
      this.resetCurrent()
    }
  }
}
</script>
