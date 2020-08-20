<template>
  <content-layout v-if="educationProduct">
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">{{educationProduct.name}}</h1>
        <div class="hud--stat-cards">
          <stat-card :data="educationProduct.id" :title="`EducationProducts`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <update-education-product :educationProduct="educationProduct"></update-education-product>
      <delete-education-product :educationProduct="educationProduct" class="mt-4"></delete-education-product>
    </template>
  </content-layout>
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
