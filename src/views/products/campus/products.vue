<template>
  <div>
    <panel-template title="Education Products" :showLoader="loading" :loadingText="loadingText" content-background-color="white">
      <template slot="action">
        <button class="btn btn-turquoise" @click="showCreateEducationProductModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Education Product</button>
      </template>
      <template slot="content">
        <education-product-list :educationProducts="educationProducts"></education-product-list>
      </template>
    </panel-template>
    <create-education-product v-if="campus" :campusId="campus.id" :educationProducts="educationProducts"></create-education-product>
  </div>
</template>

<script>
import createEducationProduct from '@/components/products/education/create'
import educationProductList from '@/components/products/education/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'education-product-list': educationProductList,
    'create-education-product': createEducationProduct
  },
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus',
      getEducationProductsByCampus: 'getEducationProductsByCampus',
      loading: 'getEducationProductsFetchLoading',
      loadingText: 'getEducationProductsFetchLoadingText'
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
