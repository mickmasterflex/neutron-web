<template>
  <content-layout>
    <template v-slot:hud-content>
      <hud-h1 :loading="loading" :content="product.name"/>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'details'">
          <router-link :to="{name: 'ProductDetails', params: {id:id}}">Product Details</router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'offers'">
          <router-link :to="{name: 'ProductOffers', params: {id:id}}">Offers <number-label :number="product.offer_contracts ? product.offer_contracts.length : 0"/></router-link>
        </underscore-tab>
      </underscore-tabs>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({
      fetchCurrentEducationProduct: 'fetchCurrentEducationProduct'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_EDUCATION_PRODUCT',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    }),
    async setEducationProduct () {
      if (this.product.id !== this.id) {
        await this.fetchCurrentEducationProduct(this.id)
      }
    },
    setProductBreadcrumbsAndTitle () {
      document.title = this.product.name
      this.setBreadcrumbs([
        { name: 'Brands', text: 'Brands' },
        { name: 'BrandDetails', text: this.product.brand_data.name, params: { id: this.$route.params.brand } },
        { name: 'BrandCampuses', text: 'Campuses', params: { id: this.$route.params.brand } },
        { name: 'CampusDetails', text: this.product.campus_data.name, params: { brand: this.$route.params.brand, id: this.$route.params.campus } },
        { name: 'CampusProducts', text: 'Products', params: { brand: this.$route.params.brand, id: this.$route.params.campus } },
        { name: 'CampusDetails', text: this.product.name, params: { brand: this.$route.params.brand, id: this.id } }
      ])
    }
  },
  computed: {
    ...mapGetters({
      product: 'getCurrentEducationProduct',
      loading: 'getEducationProductFetchLoading'
    })
  },
  created () {
    this.setEducationProduct().then(() => {
      this.setProductBreadcrumbsAndTitle()
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
