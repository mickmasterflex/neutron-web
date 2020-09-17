<template>
    <modal-template :show="showModal" @close="close">
      <template v-slot:header>Create Delivery</template>
      <template v-slot:body>
        <validation-observer ref="form">
          <form @submit.prevent="submitForm" class="form-horizontal">
            <v-text-field v-model="type" rules="required" field_id="delivery_type" field_label="Delivery Type"></v-text-field>
            <v-text-field v-model="response_parser" rules="required" field_id="response_parser" field_label="Response Parser"></v-text-field>
            <v-text-field v-model="target" rules="required" field_id="target" field_label="Target"></v-text-field>
            <v-textarea-field v-model="headers" field_id="headers" field_label="Headers"></v-textarea-field>
          </form>
        </validation-observer>
      </template>
      <template v-slot:footer-additional>
        <button @click="submitForm()" class="btn btn-lg btn-green">Create Delivery</button>
      </template>
    </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enterKeyListener'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      type: '',
      response_parser: '',
      target: '',
      headers: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateDeliveryModal'
    })
  },
  props: {
    buyer: Number
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      create: 'createDelivery'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_DELIVERY_MODAL'
    }),
    close () {
      this.type = ''
      this.response_parser = ''
      this.target = ''
      this.headers = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            buyer_contract: this.buyer,
            type: this.type,
            response_parser: this.response_parser,
            target: this.target,
            headers: this.headers
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
