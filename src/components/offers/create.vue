<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="offerName" field_label="Offer Name" class="field-group"></v-text-field>
      <v-select-field v-model="product" rules="required" :options="products" field_id="product" field_label="Product" class="field-group"></v-select-field>
      <button type="submit" class="btn btn-green mt-5">Create Offer</button>
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
      products: 'getAllProducts'
    })
  },
  created () {
    this.fetchProducts()
  }
}
</script>
