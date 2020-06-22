<template>
  <div>
    <ul class="flex flex-row mb-3">
      <li class="active"><router-link class="text-link" :to="{name: 'Products'}">Product Mgmt</router-link></li>
      <li class="px-3"> | </li>
      <li><router-link class="text-link" :to="{name: 'FieldManagement'}">Field Mgmt</router-link></li>
    </ul>
    <div class="hud">
      <h1 class="text-white text-4xl font-hairline">All Brands</h1>
      <div class="hud--stat-cards">
        <stat-card :data="getAllBrandsCount" :title="`Brands`" :color="`teal`"></stat-card>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-4">
      <h3 class="h3">Brand List</h3>
      <button class="btn btn-green" @click="showCreateBrandModal()">Create Brand</button>
    </div>
    <brand-list :brands="brands" class="mt-5"></brand-list>
    <create-brand></create-brand>
  </div>
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
      getAllBrandsCount: 'getAllBrandsCount'
    })
  },
  methods: {
    ...mapActions({
      fetchBrands: 'fetchBrands'
    }),
    ...mapMutations({
      showCreateBrandModal: 'SHOW_CREATE_BRAND_MODAL'
    })
  },
  created () {
    this.fetchBrands()
  }
}
</script>
