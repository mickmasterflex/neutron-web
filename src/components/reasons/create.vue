<template>
  <reason-modal
    :modal-visible="modalVisible"
    :loading="loading"
    :submit-action="createReason"
    :close-modal="closeModal"
    modal-purpose="Create"
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
      modalVisible: 'getShowCreateReasonModal',
      loading: 'getReasonsPostLoading'
    })
  },
  methods: {
    ...mapActions({
      createReason: 'createReason'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_REASON_MODAL'
    })
  }
}
</script>
