<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">{{brand.name}}</h1>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab" :class="contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'Brand', params: {id:id}}">Brand Details</router-link>
        </li>
        <li class="underscore-tab" :class="contentTab === 'offers' ? 'active' : ''">
          <router-link :to="{name: 'Brand', params: {id:id}}">Campuses</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <slot name="content"/>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: Number,
    contentTab: {
      type: String,
      default: 'details'
    }
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
