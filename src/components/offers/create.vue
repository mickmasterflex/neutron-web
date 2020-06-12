<template>
  <modal-template :show="showModal">
    <template v-slot:header>Create Offer Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm">
      <v-text-field v-model="name" rules="required" field_id="offerName" field_label="Offer Name" class="field-group"></v-text-field>
      <v-select-field v-model="product" rules="required" :options="products" field_id="product" field_label="Product" class="field-group"></v-select-field>
      <button type="submit" class="btn btn-green mt-5">Create Offer</button>
    </form>
  </validation-observer>
    </template>
  </modal-template>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: '',
      product: ''
    }
  },
  props: {
    buyer: Number
  },
  methods: {
    ...mapActions({
      create: 'createOffer',
      fetchProducts: 'fetchProducts'
    }),
    submitForm () {
      this.create({
        name: this.name,
        contract: this.buyer,
        product: this.product
      })
    }
  },
  computed: {
    ...mapGetters({
      products: 'getAllProducts',
      showModal: 'getShowCreateOfferModal'
    })
  },
  created () {
    this.fetchProducts()
  }
}
</script>
