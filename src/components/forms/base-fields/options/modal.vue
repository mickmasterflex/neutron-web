<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Base Option Management</template>
    <template v-slot:body>
      <div class="flex flex-row justify-between items-center pb-4">
        <h4 class="h4">{{ field ? field.label : '' }} Options</h4>
        <create-option></create-option>
      </div>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <field-options></field-options>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-green btn-lg" :disabled="loading" v-if="unsavedChanges">
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon> Update Field
      </button>
    </template>
  </modal-template>
</template>

<script>
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import fieldOptions from '@/components/forms/base-fields/options/list'
import createOption from '@/components/forms/base-fields/options/create'

export default {
  computed: {
    ...mapGetters({
      modifiedBaseOptions: 'getModifiedBaseOptions',
      showModal: 'getShowUpdateBaseOptionsModal',
      baseOptionsField: 'getCurrentBaseOptionsFieldId',
      getBaseOptionFieldById: 'getBaseOptionFieldById',
      loading: 'getBaseOptionsPutLoading'
    }),
    field () {
      return this.getBaseOptionFieldById(this.baseOptionsField)
    },
    unsavedChanges () {
      return this.modifiedBaseOptions.length > 0
    }
  },
  methods: {
    ...mapActions({
      updateOptions: 'updateModifiedBaseOptions'
    }),
    ...mapMutations({
      resetCurrentBaseOptions: 'RESET_CURRENT_BASE_OPTIONS',
      resetCurrentBaseOptionsField: 'RESET_CURRENT_BASE_OPTIONS_FIELD_ID',
      closeModal: 'CLOSE_UPDATE_BASE_OPTIONS_MODAL'
    }),
    close () {
      this.resetCurrentBaseOptions()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
      this.toggleChangesInModalUnsaved(false)
      this.resetCurrentBaseOptionsField()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateOptions().then(() => {
            this.close()
          })
        }
      })
    }
  },
  watch: {
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  mixins: [
    enterKeyListener,
    setResponseErrors,
    checkUnsavedChangesInModal
  ],
  components: {
    'field-options': fieldOptions,
    'create-option': createOption
  }
}
</script>
