<template>
  <v-tree-select
    :options="tree"
    :rules="rules"
    v-model="inner_value"
    v-bind="$attrs"
    :show-count="true"
    field_id="product"
    :disable-branch-nodes="true"
    field_label="Product"/>
</template>

<script>
import vTreeSelect from '@/components/ui/forms/validation-fields/select-tree-field'
import validation from '@/mixins/fields/validation'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      tree: []
    }
  },
  mixins: [validation],
  computed: {
    ...mapGetters({
      loading: 'getProductsFetchLoading',
      products: 'getAllProducts',
      productsByProductGroup: 'getProductsByProductGroup',
      productGroupsByBrand: 'getProductGroupsByBrand',
      brands: 'getAllBrands'
    })
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts',
      fetchProductGroups: 'fetchProductGroups',
      fetchBrands: 'fetchBrands'
    }),
    async fetchItAll () {
      await this.fetchProducts()
      await this.fetchProductGroups()
      await this.fetchBrands()
    },
    mappedBrands () {
      return this.brands.map(brand => {
        return { id: brand.id + '-brand', label: brand.name, children: this.mappedProductGroups(brand.id) }
      })
    },
    mappedProductGroups (brandId) {
      return this.productGroupsByBrand(brandId).map(productGroup => {
        return { id: productGroup.id + '-product-group', label: productGroup.name, children: this.mappedProducts(productGroup.id) }
      })
    },
    mappedProducts (productGroupId) {
      return this.productsByProductGroup(productGroupId).map(product => {
        return { id: product.id, label: product.name }
      })
    },
    generateTree () {
      this.tree = this.mappedBrands()
    }
  },
  mounted () {
    this.fetchItAll().then(() => {
      this.generateTree()
    })
  },
  components: {
    'v-tree-select': vTreeSelect
  }
}
</script>
