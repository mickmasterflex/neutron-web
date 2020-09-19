<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Offer Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm" class="form-horizontal">
      <v-text-field v-model="name" rules="required" field_id="name" field_label="Offer Name"></v-text-field>
      <v-select-field v-model="product" rules="required" :options="products" field_id="product" field_label="Product"></v-select-field>
    </form>
  </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Offer</button>
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
      name: '',
      product: ''
    }
  },
  computed: {
    ...mapGetters({
      products: 'getAllProducts',
      showModal: 'getShowCreateOfferModal'
    })
  },
  props: {
    buyer: Number
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      create: 'createOffer',
      fetchProducts: 'fetchProducts'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_OFFER_MODAL'
    }),
    close () {
      this.name = ''
      this.contract = ''
      this.product = ''
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
            name: this.name,
            contract: this.buyer,
            product: this.product
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
