<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">{{campus.name}}</h1>
        <div class="hud--stat-cards">
          <stat-card :data="campus.id" :title="`Campus`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'CampusDetails', params: {id:id}}">Campus Details</router-link>
        </li>
        <li class="underscore-tab" :class="$route.meta.contentTab === 'products' ? 'active' : ''">
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
      fetchCurrentCampus: 'fetchCurrentCampus'
    })
  },
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus'
    })
  },
  created () {
    this.fetchCurrentCampus(this.id)
  }
}
</script>
