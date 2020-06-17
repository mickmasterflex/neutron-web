<template>
  <modal-template :show="showModal" @close="close" modalClass="modal-lg">
    <template v-slot:header>
      Modify Form Fields
      <span class="text-lg text-gray-700 block">{{modalHeading}}</span>
    </template>
    <template v-slot:body>
      <list-fields></list-fields>
      <create-field class="mt-3"></create-field>
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green btn-lg" @click="saveModifiedFields()" :disabled="!unsavedChanges">Save Field Order</button>
    </template>
  </modal-template>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
      showModal: 'getShowFieldManagementModal',
      unsavedChanges: 'getChangesInModalUnsaved'
    })
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_FIELD_MANAGEMENT_MODAL',
      toggleShowCreateField: 'TOGGLE_SHOW_CREATE_FIELD',
      toggleChangesInModalUnsaved: 'TOGGLE_CHANGES_IN_MODAL_UNSAVED'
    }),
    ...mapActions({
      updateModifiedFields: 'updateModifiedFields'
    }),
    close () {
      this.closeModal()
      this.toggleShowCreateField(false)
    },
    saveModifiedFields () {
      this.updateModifiedFields()
      this.toggleChangesInModalUnsaved(false)
    }
  }
}
</script>
