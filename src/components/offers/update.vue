<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="offerName" field_label="Offer Name" class="field-group"></v-text-field>
      <select-field v-model="contract" :options="buyerContracts" field_id="buyer" field_label="buyer" class="field-group"></select-field>
      <select-field v-model="product" :options="product" field_id="product" field_label="product" class="field-group"></select-field>
      <button class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: '',
      contract: '',
      product: ''
    }
  },
  props: {
    id: {
      type: Number
    },
    client: {
      type: Number
    }
  },
  methods: {
    ...mapActions({ update: 'updateOffer' }),
    submitForm () {
      this.update({
        name: this.name,
        contract: this.contract,
        client: this.client,
        product: this.product
      })
    }
  },
  computed: { ...mapGetters({ siblings: 'getOffer' }) }
}
</script>
