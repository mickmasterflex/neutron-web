<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Add Additional Form Content</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-select-field
            v-model="contentType"
            rules="required"
            field_id="contentType"
            field_label="Type"
            :options="formatListForSelectOptions(contentTypes)"/>
          <div class="field-group ml-label-width">
            <checkbox-field
              @click="leadIdToggle = !leadIdToggle"
              :value="leadIdToggle"
              v-if="contentType === 'tcpa'"
              label="Leadid Toggle"
              field_id="leadid_toggle"
              :style-as-field="true"/>
          </div>
          <v-textarea-field
            v-model="contentBlock"
            field_id="additional_content_block"
            field_label="Content"
            rules="required"/>
          <div class="field-group ml-label-width">
            <checkbox-field
              :value="doubleOptin"
              @click="doubleOptin = !doubleOptin"
              label="Double Opt-in"
              field_id="double_optin"
              :style-as-field="true"/>
          </div>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Add Content</button>
    </template>
  </modal-template>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import formatList from '@/mixins/format-list-for-select-options'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  mixins: [formatList, setResponseErrors],
  data () {
    return {
      contentType: 'tcpa',
      contentBlock: '',
      leadIdToggle: false,
      doubleOptin: false
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateAdditionalFormContentModal',
      contentTypes: 'getAdditionalFormContentTypes',
      currentForm: 'getCurrentForm'
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
      return data
    }
  },
  methods: {
    ...mapActions({
      createAdditionalFormContent: 'createAdditionalFormContent'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_ADDITIONAL_FORM_CONTENT_MODAL'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.createAdditionalFormContent(this.submitData).then(() => {
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
    }
  }
}
</script>
