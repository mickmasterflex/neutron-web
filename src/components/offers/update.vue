<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="offerName" field_label="Offer Name" class="field-group"></v-text-field>
      <v-select-field v-model="product" rules="required" :options="products" field_id="product" field_label="product" class="field-group"></v-select-field>
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
    id: Number,
    buyer: Number
  },

  methods: {
    ...mapActions({
      update: 'updateOffer',
      fetchProducts: 'fetchProducts'
    }),
    submitForm () {
      this.update({
        id: this.id,
        name: this.name,
        contract: this.$props.buyer,
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
