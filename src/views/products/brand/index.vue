<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="h1 text-white">{{brand.name}}</h1>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'details'">
          <router-link :to="{name: 'BrandDetails', params: {id:id}}">Brand Details</router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'campuses'">
          <router-link :to="{name: 'BrandCampuses', params: {id:id}}">Campuses <label-number :number="brand.campuses ? brand.campuses.length : 0"/></router-link>
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
    },
    setBrandBreadcrumbsAndTitle () {
      document.title = this.brand.name
      this.setBreadcrumbs([
        { name: 'Brands', text: 'Brands' },
        { name: 'BrandDetails', text: this.brand.name, params: { id: this.id } }
      ])
    }
  },
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand'
    })
  },
  created () {
    this.setBrand().then(() => {
      this.setBrandBreadcrumbsAndTitle()
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
