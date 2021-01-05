<template>
  <v-select-field
    :loading="loading"
    :rules="rules"
    :options="products"
    v-model="inner_value"
    v-bind="$attrs"
    field_id="product"
    field_label="Product"></v-select-field>
</template>

<script>
import validation from '@/mixins/fields/validation'
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [validation],
  computed: {
    ...mapGetters({
      loading: 'getProductsFetchLoading',
      products: 'getAllProducts'
    })
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts'
    })
  },
  mounted () {
    this.fetchProducts()
  }
}
</script>
