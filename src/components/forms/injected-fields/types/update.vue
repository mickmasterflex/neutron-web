<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>
      Update Injected Field Type
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field  rules="required"
                         field_class="field-tall"
                         v-model="injectedFieldType"
                         field_label="Injected Field Type"
                         field_id="field_type">
          </v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm" class="btn btn-green btn-lg">Update</button>
    </template>
</modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      injectedFieldType: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateInjectedFieldTypeModal',
      currentInjectedFieldType: 'getCurrentInjectedFieldType',
      fieldTypes: 'getInjectedFieldTypes'
    }),
    unsavedChanges () {
      if (this.currentInjectedFieldType) {
        return this.injectedFieldType !== this.currentInjectedFieldType.field_type
      } else {
        return false
      }
    }
  },
  watch: {
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  mixins: [checkUnsavedChangesInModal, enterKeyListener, setResponseErrors],
  updated () {
    if (this.currentInjectedFieldType) {
      this.injectedFieldType = this.currentInjectedFieldType.field_type
    }
  },
  methods: {
    ...mapActions({
      update: 'updateInjectedFieldType'
    }),
    ...mapMutations({
      resetCurrentInjectedFieldType: 'RESET_CURRENT_INJECTED_FIELD_TYPE',
      closeModal: 'CLOSE_UPDATE_INJECTED_FIELD_TYPE_MODAL'
    }),
    close () {
      this.closeModal()
      this.injectedFieldType = ''
      this.resetCurrentInjectedFieldType()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            field_type: this.injectedFieldType,
            id: this.currentInjectedFieldType.id
          }).then(() => {
            this.closeModal()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
