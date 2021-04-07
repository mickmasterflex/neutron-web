<template>
  <modal-template :show="modalVisible" @close="close">
    <template v-slot:header>
      <slot name="header">Update Reason</slot>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field
            v-model="name"
            rules="required|standard_chars"
            field_id="name"
            field_label="Name"
            :field_disabled="loading"></v-text-field>
          <v-textarea-field
            v-model="description"
            rules="required|standard_chars"
            field_id="description"
            field_label="Description"
            :field_disabled="loading"></v-textarea-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green" :disabled="loading">
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon> Update Reason
      </button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'

export default {
  data () {
    return {
      name: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters({
      modalVisible: 'getShowUpdateReasonModal',
      currentReason: 'getCurrentReason',
      loading: 'getReasonsPutLoading'
    }),
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.currentReason.name || this.description !== this.currentReason.description
      } else {
        return false
      }
    }
  },
  mixins: [checkUnsavedChangesInModal],
  watch: {
    unsavedChanges () {
      this.checkUnsavedChanges(this.modalVisible, this.unsavedChanges)
    }
  },
  methods: {
    ...mapActions({
      updateReason: 'updateReason'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_REASON',
      closeModal: 'CLOSE_UPDATE_REASON_MODAL'
    }),
    close () {
      this.closeModal()
      this.name = ''
      this.description = ''
      this.resetCurrent()
      this.toggleChangesInModalUnsaved(false)
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateReason({
            id: this.currentReason.id,
            name: this.name,
            description: this.description
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  updated () {
    if (this.currentReason) {
      this.name = this.currentReason.name
      this.description = this.currentReason.description
    }
  }
}
</script>
