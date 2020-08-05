<template>
  <div v-if="educationProduct">
    <div class="hud">
      <h1 class="h1 text-white">{{educationProduct.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="educationProduct.id" :title="`EducationProducts`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Edit Education Product</h3>
    <update-education-product :educationProduct="educationProduct"></update-education-product>

    <h3 class="h3 mt-5 mb-2">Delete Education Product</h3>
    <delete-education-product :educationProduct="educationProduct"></delete-education-product>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteEducationProduct from '@/components/education-products/delete'
import updateEducationProduct from '@/components/education-products/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-education-product': deleteEducationProduct,
    'update-education-product': updateEducationProduct
  },
  computed: {
    ...mapGetters({
      educationProduct: 'getCurrentEducationProduct'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentEducationProduct: 'fetchCurrentEducationProduct'
    })
  },
  created () {
    this.fetchCurrentEducationProduct(this.id)
  }
}
</script>
