<template>
  <div>
    <action-heading>
      <template v-slot:left>
        <h3 class="h3">Education Products List</h3>
      </template>
      <template v-slot:right>
        <button class="btn btn-turquoise" @click="showCreateEducationProductModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Education Product</button>
      </template>
    </action-heading>
    <education-product-list :educationProducts="educationProducts" class="mt-5"></education-product-list>
    <create-education-product v-if="campus" :campusId="campus.id" :educationProducts="educationProducts"></create-education-product>
  </div>
</template>

<script>
import createEducationProduct from '@/components/education-products/create'
import educationProductList from '@/components/education-products/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'education-product-list': educationProductList,
    'create-education-product': createEducationProduct
  },
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus',
      getEducationProductsByCampus: 'getEducationProductsByCampus'
    }),
    educationProducts: function () {
      return this.getEducationProductsByCampus(this.campus.id)
    }
  },
  methods: {
    ...mapActions({
      fetchEducationProducts: 'fetchEducationProducts'
    }),
    ...mapMutations({
      showCreateEducationProductModal: 'SHOW_CREATE_EDUCATION_PRODUCT_MODAL'
    })
  },
  created () {
    this.fetchEducationProducts()
  }
}
</script>
