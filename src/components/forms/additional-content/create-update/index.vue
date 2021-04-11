<template>
  <additional-content-modal
    :show-modal="showModal"
    :close-modal="close"
    :modal-purpose="modalPurpose"
    :loading="loading"
    :submit-action="submitAction"
  />
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import contentModal from './modal'

export default {
  computed: {
    ...mapGetters({
      showUpdateModal: 'getShowUpdateAdditionalFormContentModal',
      showCreateModal: 'getShowCreateAdditionalFormContentModal',
      putLoading: 'getAdditionalFormContentPutLoading',
      postLoading: 'getAdditionalFormContentPostLoading'
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
        ? 'Update' : 'Add'
    },
    submitAction () {
      return this.showUpdateModal
        ? this.updateAdditionalFormContent : this.createAdditionalFormContent
    },
    close () {
      return this.showUpdateModal
        ? this.closeUpdateModal : this.closeCreateModal
    }
  },
  methods: {
    ...mapActions({
      createAdditionalFormContent: 'createAdditionalFormContent',
      updateAdditionalFormContent: 'updateAdditionalFormContent'
    }),
    ...mapMutations({
      closeUpdateModal: 'CLOSE_UPDATE_ADDITIONAL_FORM_CONTENT_MODAL',
      closeCreateModal: 'CLOSE_CREATE_ADDITIONAL_FORM_CONTENT_MODAL'
    })
  },
  components: {
    'additional-content-modal': contentModal
  }
}
</script>
