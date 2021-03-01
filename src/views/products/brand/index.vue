<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">{{brand.name}}</h1>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'BrandDetails', params: {id:id}}">Brand Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'campuses' ? 'active' : ''">
          <router-link :to="{name: 'BrandCampuses', params: {id:id}}">Campuses</router-link>
        </li>
      </ul>
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
      fetchCurrentBrand: 'fetchCurrentBrand'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_BRAND',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    }),
    async setBrand () {
      if (this.brand.id !== this.id) {
        await this.fetchCurrentBrand(this.id)
      }
    }
  },
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand'
    })
  },
  created () {
    this.setBrand().then(() => {
      document.title = this.brand.name
    })
    this.setBreadcrumbs([
      { name: 'Brands', text: 'Brands' },
      { name: 'BrandDetails', text: this.id, params: { id: this.id } }
    ])
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
