<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="partnerName" field_label="Name" class="field-group"></v-text-field>
      <text-feild v-model="short_description" field_id="shortDescription" field_label="Short Description" class="description"></text-feild>
      <select-field v-model="product_group" :options="product_group" field_id="product" field_label="Product" class="product-group"></select-field>
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
      short_description: '',
      product_group: ''
    }
  },
  props: {
    product: Object
  },
  watch: {
    product: function () {
      this.name = this.product.name
      this.short_description = this.product.short_description
      this.product_group = this.product.product_group
    }
  },
  methods: {
    ...mapActions({
      update: 'updateProduct'
    }),
    submitForm () {
      this.update({
        id: this.product.id,
        name: this.name,
        short_description: this.product.short_description,
        product_group: this.product.product_group
      })
    }
  }
}
</script>
