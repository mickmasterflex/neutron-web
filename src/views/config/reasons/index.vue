<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="h1 text-white">Reasons Management</h1>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'reasons'">
          <router-link :to="{ name: 'Reasons' }">Reasons <label-number :number="allReasons.length"></label-number></router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'mappings'">
          <router-link :to="{ name: 'ResponseMappings' }">Response Mappings</router-link>
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
  computed: {
    ...mapGetters({
      allReasons: 'getAllReasons'
    })
  },
  methods: {
    ...mapMutations({
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    }),
    ...mapActions({
      fetchReasons: 'fetchReasons'
    })
  },
  created () {
    this.resetBreadcrumbs()
    this.fetchReasons()
  }
}
</script>
