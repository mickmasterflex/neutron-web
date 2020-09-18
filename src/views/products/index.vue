<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">All Brands</h1>
      <div class="hud--stat-cards">
        <stat-card :data="getAllBrandsCount" :title="`Brands`" :color="`teal`"></stat-card>
      </div>
    </template>
    <template v-slot:content>
      <action-heading>
        <template v-slot:left>
          <h2 class="h3">Brand List</h2>
        </template>
        <template v-slot:right>
          <button class="btn btn-turquoise" @click="showCreateBrandModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Brand</button>
        </template>
      </action-heading>
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
