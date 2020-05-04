<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="offerName" field_label="Offer Name" class="field-group"></v-text-field>
      <select-field v-model="products" :options="products" field_id="products" field_label="products" class="field-group"></select-field>
      <button class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      products: ''
    }
  },
  props: {
    buyer: Number
  },
  methods: {
    ...mapActions({ create: 'createOffer' }),
    submitForm () {
      this.create({
        name: this.name,
        contract: this.buyer,
        product: 1
      })
    }
  }
}
</script>
