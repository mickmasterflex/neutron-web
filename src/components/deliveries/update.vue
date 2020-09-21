<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>
      Update Delivery
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-select-field v-model="type" rules="required" field_id="delivery_type" field_label="Delivery Type" :options="types"></v-select-field>
          <v-select-field v-model="response_parser" rules="required" field_id="response_parser" field_label="Response Parser" :options="parsers"></v-select-field>
          <v-text-field v-model="target" field_id="target" field_label="Target (URL)" rules="required|url"></v-text-field>
          <v-textarea-field v-model="headers" field_id="headers" field_label="Headers"></v-textarea-field>
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
import { checkUnsavedChangesInModal } from '@/mixins/checkUnsavedChangesInModal'
import { enterKeyListener } from '@/mixins/enterKeyListener'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      type: '',
      response_parser: '',
      target: '',
      headers: '',
      types: { HttpPostDelivery: { name: 'HttpPostDelivery', id: 'HttpPostDelivery' } },
      parsers: { Proton: { name: 'Proton', id: 'Proton' } }
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateDeliveryModal',
      delivery: 'getCurrentDelivery'
    }),
    unsavedChanges () {
      if (this.delivery) {
        return this.type !== this.delivery.type || this.response_parser !== this.delivery.response_parser || this.target !== this.delivery.target || this.headers !== this.delivery.headers
      }
      return false
    }
  },
  watch: {
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  mixins: [checkUnsavedChangesInModal, enterKeyListener, setResponseErrors],
  updated () {
    if (this.delivery) {
      this.type = this.delivery.type
      this.response_parser = this.delivery.response_parser
      this.target = this.delivery.target
      this.headers = this.delivery.headers
    }
  },
  methods: {
    ...mapActions({
      update: 'updateDelivery'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_UPDATE_DELIVERY_MODAL',
      resetDelivery: 'RESET_CURRENT_DELIVERY'
    }),
    enterKeyAction () {
      if (this.delivery) {
        this.submitForm()
      }
    },
    close () {
      this.closeModal()
      this.resetDelivery()
      this.type = ''
      this.response_parser = ''
      this.target = ''
      this.headers = ''
      this.toggleChangesInModalUnsaved(false)
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            type: this.type,
            response_parser: this.response_parser,
            target: this.target,
            headers: this.headers,
            buyer_contract: this.delivery.buyer_contract,
            id: this.delivery.id
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
