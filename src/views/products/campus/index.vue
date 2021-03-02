<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">{{campus.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="campus.id" :title="`Campus`"></stat-card>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'CampusDetails', params: {id:id}}">Campus Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'products' ? 'active' : ''">
          <router-link :to="{name: 'CampusProducts', params: {id:id}}">Products</router-link>
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
        { name: 'BrandDetails', text: this.campus.brand.name, params: { id: this.$route.params.brand } },
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
