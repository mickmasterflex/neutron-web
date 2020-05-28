<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="offerName" field_label="Offer Name" class="field-group"></v-text-field>
      <v-select-field v-model="product" rules="required" :options="products" field_id="product" field_label="Product" class="field-group"></v-select-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
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
    offer: Object
  },
  watch: {
    offer: function () {
      this.name = this.offer.name
      this.product = this.offer.product
    }
  },

  methods: {
    ...mapActions({
      update: 'updateOffer',
      fetchProducts: 'fetchProducts'
    }),
    submitForm () {
      this.update({
        id: this.offer.id,
        name: this.name,
        contract: this.offer.contract,
        product: this.product,
        client: this.offer.client
      })
    }
  },
  computed: {
    ...mapGetters({
      products: 'getAllProducts',
      offers: 'getCurrentOffers'
    })
  },
  created () {
    this.fetchProducts()
  }
}
</script>
