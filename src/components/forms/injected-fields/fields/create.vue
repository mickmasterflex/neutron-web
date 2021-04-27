<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Injected Field</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-select-field v-model="type" rules="required" field_id="field_type" field_label="Type" :options="fieldTypes">
            <template v-slot:option="slotProps">{{ slotProps.option.field_type }}</template>
          </v-select-field>
          <v-text-field v-model="key" field_id="field_key" field_label="Key" rules="required"></v-text-field>
          <text-field v-model="value" field_id="field_value" field_label="Value"></text-field>
          <text-field v-model="params" field_id="posting_params" field_label="Posting Params"></text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Injected Field</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      type: '',
      key: '',
      value: '',
      params: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateInjectedFieldModal',
      fieldTypes: 'getInjectedFieldTypes',
      currentForm: 'getCurrentForm'
    })
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      createInjectedField: 'createInjectedField'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_INJECTED_FIELD_MODAL'
    }),
    close () {
      this.type = ''
      this.key = ''
      this.value = ''
      this.params = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.createInjectedField({
            field_type: this.type,
            field_key: this.key,
            field_value: this.value,
            posting_params: this.params,
            form: this.currentForm.id
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
