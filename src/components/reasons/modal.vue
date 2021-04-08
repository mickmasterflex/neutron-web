<template>
  <modal-template :show="modalVisible" @close="close">
    <template v-slot:header>{{ modalPurpose }} Reason</template>
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
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon> {{ modalPurpose }} Reason
      </button>
    </template>
  </modal-template>
</template>

<script>
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { mapGetters } from 'vuex'
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
    modalVisible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    submitAction: {
      type: Function,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    },
    modalPurpose: {
      type: String,
      required: true,
      validator (value) {
        return ['Create', 'Update'].includes(value)
      }
    }
  },
  computed: {
    ...mapGetters({
      currentReason: 'getCurrentReason'
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
      if (this.currentReason.name) {
        return this.name !== this.currentReason.name || this.description !== this.currentReason.description
      } else {
        return false
      }
    }
  },
  watch: {
    unsavedChanges () {
      this.checkUnsavedChanges(this.modalVisible, this.unsavedChanges)
    }
  },
  methods: {
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
