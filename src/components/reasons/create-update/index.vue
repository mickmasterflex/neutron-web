<template>
  <reason-modal
    :show-modal="showModal"
    :loading="loading"
    :submit-action="submitAction"
    :close-modal="closeModal"
    :modal-purpose="modalPurpose"
  ></reason-modal>
</template>

<script>
import reasonModal from '@/components/reasons/create-update/modal'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'reason-modal': reasonModal
  },
  computed: {
    ...mapGetters({
      showUpdateModal: 'getShowUpdateReasonModal',
      showCreateModal: 'getShowCreateReasonModal',
      putLoading: 'getReasonsPutLoading',
      postLoading: 'getReasonsPostLoading'
    }),
    loading () {
      return this.showUpdateModal
        ? this.putLoading : this.postLoading
    },
    showModal () {
      return this.showUpdateModal
        ? this.showUpdateModal : this.showCreateModal
    },
    modalPurpose () {
      return this.showUpdateModal
        ? 'Update' : 'Create'
    },
    submitAction () {
      return this.showUpdateModal
        ? this.updateReason : this.createReason
    },
    closeModal () {
      return this.showUpdateModal
        ? this.closeUpdateModal : this.closeCreateModal
    }
  },
  methods: {
    ...mapActions({
      createReason: 'createReason',
      updateReason: 'updateReason'
    }),
    ...mapMutations({
      closeCreateModal: 'CLOSE_CREATE_REASON_MODAL',
      closeUpdateModal: 'CLOSE_UPDATE_REASON_MODAL'
    })
  }
}
</script>
