<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header><span class="capitalize">{{ modalPurpose }}</span> Reason</template>
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
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon> <span class="capitalize">{{ modalPurpose }}</span> Reason
      </button>
    </template>
  </modal-template>
</template>

<script>
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { mapGetters, mapMutations } from 'vuex'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'

export default {
  mixins: [enterKeyListener, setResponseErrors, checkUnsavedChangesInModal],
  data () {
    return {
      name: '',
      description: ''
    }
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    submitAction: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currentReason: 'getCurrentReason',
      showModal: 'getShowCreateUpdateReasonModal',
      modalPurpose: 'getCreateUpdateReasonModalPurpose'
    }),
    submitData () {
      const data = {
        name: this.name,
        description: this.description
      }
      if (this.currentReason) {
        data.id = this.currentReason.id
      }
      return data
    },
    unsavedChanges () {
      if (this.currentReason.id) {
        return this.name !== this.currentReason.name ||
          this.description !== this.currentReason.description
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
  methods: {
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_REASON',
      closeModal: 'CLOSE_CREATE_UPDATE_REASON_MODAL'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.submitAction(this.submitData).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    },
    close () {
      this.closeModal()
      this.name = ''
      this.description = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      if (this.currentReason) {
        this.resetCurrent()
      }
      this.toggleChangesInModalUnsaved(false)
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
