<template>
  <modal-template :show="showModal" @close="close" dialogClass="modal-dialog-lg">
    <template v-slot:header>
      Modify Form Fields
      <span class="text-lg text-gray-700 block">{{modalHeading}}</span>
    </template>
    <template v-slot:body>
      <list-fields></list-fields>
      <create-field class="mt-3"></create-field>
    </template>
  </modal-template>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'

export default {
  props: {
    modalHeading: {
      type: String,
      default: 'Contract Offer Form Fields'
    }
  },
  components: {
    'list-fields': listFields,
    'create-field': createField
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowFieldManagementModal'
    })
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_FIELD_MANAGEMENT_MODAL',
      resetCurrentField: 'RESET_CURRENT_FIELD'
    }),
    close () {
      this.closeModal()
      this.resetCurrentField()
    }
  }
}
</script>
