<template>
  <additional-content-modal
    :loading="loading"
    :submit-action="submitAction"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import contentModal from './modal'

export default {
  computed: {
    ...mapGetters({
      putLoading: 'getAdditionalFormContentPutLoading',
      postLoading: 'getAdditionalFormContentPostLoading',
      purposeIsUpdate: 'getModalPurposeIsUpdate'
    }),
    loading () {
      return this.purposeIsUpdate
        ? this.putLoading : this.postLoading
    },
    submitAction () {
      return this.purposeIsUpdate
        ? this.updateAdditionalFormContent : this.createAdditionalFormContent
    }
  },
  methods: {
    ...mapActions({
      createAdditionalFormContent: 'createAdditionalFormContent',
      updateAdditionalFormContent: 'updateAdditionalFormContent'
    })
  },
  components: {
    'additional-content-modal': contentModal
  }
}
</script>
