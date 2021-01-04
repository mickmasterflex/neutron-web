<template>
  <content-layout v-if="educationProduct">
    <template v-slot:hud>
      <h1 class="h1 text-white">{{educationProduct.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="educationProduct.id" :title="`EducationProducts`" :color="`teal`"></stat-card>
      </div>
    </template>
    <template v-slot:content>
      <base-panel-grid>
        <update-education-product :educationProduct="educationProduct" class="col-span-2 xl:col-span-1"></update-education-product>
        <panel-template title="Danger Zone" class="col-span-2" :showLoader="loading" :loadingText="loadingText">
          <template #content>
            <delete-education-product :educationProduct="educationProduct"></delete-education-product>
          </template>
        </panel-template>
      </base-panel-grid>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteEducationProduct from '@/components/products/education-products/delete'
import updateEducationProduct from '@/components/products/education-products/update'

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
      educationProduct: 'getCurrentEducationProduct',
      loading: 'getEducationProductFetchLoading',
      loadingText: 'getEducationProductFetchLoadingText'
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
