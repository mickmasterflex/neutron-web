<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="offerName" field_label="Offer Name" class="field-group"></v-text-field>
      <select-field v-model="product" :options="product" field_id="product" field_label="product" class="field-group"></select-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      product: 1
    }
  },
  props: {
    id: {
      type: Number
    },
    buyer: Number
  },
  methods: {
    ...mapActions({ update: 'updateOffer' }),
    submitForm () {
      this.update({
        pk: this.id,
        name: this.name,
        contract: this.$props.buyer,
        product: 1
      })
    }
  }
}
</script>
