<template>
  <reason-modal
    :loading="loading"
    :submit-action="submitAction"
  ></reason-modal>
</template>

<script>
import reasonModal from '@/components/reasons/create-update/modal'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'reason-modal': reasonModal
  },
  computed: {
    ...mapGetters({
      putLoading: 'getReasonsPutLoading',
      postLoading: 'getReasonsPostLoading',
      purposeIsUpdate: 'getCreateUpdateReasonModalPurposeIsUpdate'
    }),
    loading () {
      return this.purposeIsUpdate
        ? this.putLoading : this.postLoading
    },
    submitAction () {
      return this.purposeIsUpdate
        ? this.updateReason : this.createReason
    }
  },
  methods: {
    ...mapActions({
      createReason: 'createReason',
      updateReason: 'updateReason'
    })
  }
}
</script>
