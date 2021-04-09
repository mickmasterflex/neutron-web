<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="h1 text-white">{{campus.name}}</h1>
      <hud-stat-cards>
        <stat-card :data="campus.id" title="Campus" key="campusCount"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'details'">
          <router-link :to="{name: 'CampusDetails', params: { id: id, brand: $route.params.brand }}">Campus Details</router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'products'">
          <router-link :to="{name: 'CampusProducts', params: { id: id, brand: $route.params.brand }}">Products <label-number :number="campus.products ? campus.products.length : 0"/></router-link>
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
      fetchCurrentCampus: 'fetchCurrentCampus'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_CAMPUS',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    }),
    async setCampus () {
      if (this.campus.id !== this.id) {
        await this.fetchCurrentCampus(this.id)
      }
    },
    setCampusBreadcrumbsAndTitle () {
      document.title = this.campus.name
      this.setBreadcrumbs([
        { name: 'Brands', text: 'Brands' },
        { name: 'BrandDetails', text: this.campus.brand_data.name, params: { id: this.$route.params.brand } },
        { name: 'BrandCampuses', text: 'Campuses', params: { id: this.$route.params.brand } },
        { name: 'CampusDetails', text: this.campus.name, params: { brand: this.$route.params.brand, id: this.id } }
      ])
    }
  },
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus'
    })
  },
  created () {
    this.setCampus().then(() => {
      this.setCampusBreadcrumbsAndTitle()
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
