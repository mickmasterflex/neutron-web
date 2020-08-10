<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">{{brand.name}}</h1>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'BrandDetails', params: {id:id}}">Brand Details</router-link>
        </li>
        <li class="underscore-tab" :class="$route.meta.contentTab === 'campuses' ? 'active' : ''">
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
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({
      fetchCurrentBrand: 'fetchCurrentBrand'
    })
  },
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand'
    })
  },
  created () {
    this.fetchCurrentBrand(this.id)
  }
}
</script>
