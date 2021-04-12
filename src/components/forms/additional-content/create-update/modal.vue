<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header><span class="capitalize">{{ modalPurpose }}</span> Content</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-select-field
            v-model="contentType"
            rules="required"
            field_id="contentType"
            field_label="Type"
            :options="formatListForSelectOptions(contentTypes)"
            :field_disabled="loading"/>
          <div class="field-group ml-label-width">
            <checkbox-field
              @click="leadIdToggle = !leadIdToggle"
              :value="leadIdToggle"
              v-if="contentType === 'tcpa'"
              label="Leadid Toggle"
              field_id="leadid_toggle"
              :style-as-field="true"
              :disabled="loading"/>
          </div>
          <v-textarea-field
            v-model="contentBlock"
            field_id="additional_content_block"
            field_label="Content"
            rules="required"
            :field_disabled="loading"/>
          <div class="field-group ml-label-width">
            <checkbox-field
              :value="doubleOptin"
              @click="doubleOptin = !doubleOptin"
              label="Double Opt-in"
              field_id="double_optin"
              :style-as-field="true"
              :disabled="loading"/>
          </div>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green" :disabled="loading">
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon> <span class="capitalize">{{ modalPurpose }}</span> Content
      </button>
    </template>
  </modal-template>
</template>

<script>
import formatList from '@/mixins/format-list-for-select-options'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'

export default {
  mixins: [formatList, enterKeyListener, setResponseErrors, checkUnsavedChangesInModal],
  data () {
    return {
      contentType: 'tcpa',
      contentBlock: '',
      leadIdToggle: false,
      doubleOptin: false
    }
  },
  props: {
    showModal: {
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
    }
  },
  computed: {
    ...mapGetters({
      contentTypes: 'getAdditionalFormContentTypes',
      currentForm: 'getCurrentForm',
      currentAdditionalFormContent: 'getCurrentAdditionalFormContent',
      modalPurpose: 'getAdditionalFormContentModalPurpose'
    }),
    submitData () {
      const data = {
        additional_content_type: this.contentType,
        additional_content_block: this.contentBlock,
        double_optin: this.doubleOptin,
        form: this.currentForm.id
      }
      if (this.contentType === 'tcpa') {
        data.leadid_toggle = this.leadIdToggle
      }
      if (this.currentAdditionalFormContent.id) {
        data.id = this.currentAdditionalFormContent.id
      }
      return data
    },
    unsavedChanges () {
      if (this.currentAdditionalFormContent.id) {
        return this.contentType !== this.currentAdditionalFormContent.additional_content_type ||
          this.contentBlock !== this.currentAdditionalFormContent.additional_content_block ||
          this.leadIdToggle !== this.currentAdditionalFormContent.leadid_toggle ||
          this.doubleOptin !== this.currentAdditionalFormContent.double_optin
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
      resetCurrent: 'RESET_CURRENT_ADDITIONAL_FORM_CONTENT'
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
      this.contentType = 'tcpa'
      this.contentBlock = ''
      this.leadIdToggle = false
      this.doubleOptin = false
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      if (this.currentAdditionalFormContent) {
        this.resetCurrent()
      }
      this.toggleChangesInModalUnsaved(false)
    }
  },
  updated () {
    if (this.currentAdditionalFormContent.id) {
      this.contentType = this.currentAdditionalFormContent.additional_content_type
      this.contentBlock = this.currentAdditionalFormContent.additional_content_block
      this.leadIdToggle = this.currentAdditionalFormContent.leadid_toggle
      this.doubleOptin = this.currentAdditionalFormContent.double_optin
    }
  }
}
</script>
