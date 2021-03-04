<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">All Brands</h1>
      <hud-stat-cards>
        <stat-card :data="getAllBrandsCount" title="Brands" key="brandCount"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:content>
      <panel-template title="Brand List" :showLoader="loading" :loadingText="loadingText" content-background-color="white">
        <template slot="action">
          <button class="btn btn-turquoise" @click="showCreateBrandModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Brand</button>
        </template>
        <template slot="content">
          <brand-list :brands="brands"></brand-list>
        </template>
      </panel-template>
      <create-brand></create-brand>
    </template>
  </content-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import brandList from '@/components/brands/list'
import createBrand from '@/components/brands/create'

export default {
  components: {
    'brand-list': brandList,
    'create-brand': createBrand
  },
  computed: {
    ...mapGetters({
      brands: 'getAllBrands',
      getAllBrandsCount: 'getAllBrandsCount',
      loading: 'getBrandsFetchLoading',
      loadingText: 'getBrandsFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchBrands: 'fetchBrands'
    }),
    ...mapMutations({
      showCreateBrandModal: 'SHOW_CREATE_BRAND_MODAL',
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    })
  },
  created () {
    this.resetBreadcrumbs()
    this.fetchBrands()
  }
}
</script>
