<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="text-white text-4xl font-hairline">All Brands</h1>
        <div class="hud--stat-cards">
          <stat-card :data="getAllBrandsCount" :title="`Brands`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="flex flex-row justify-between">
        <h3 class="h3">Brand List</h3>
        <button class="btn btn-green" @click="showCreateBrandModal()">Create Brand</button>
      </div>
      <brand-list :brands="brands" class="mt-5"></brand-list>
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
