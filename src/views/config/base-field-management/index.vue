<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="h1 text-white">Field Management</h1>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'baseFields'">
          <router-link :to="{name: 'BaseFields'}">Base Fields <number-label :number="baseFieldCount"></number-label></router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'injectedFieldTypes'">
          <router-link :to="{name: 'InjectedFieldTypes'}">Injected Fields <number-label :number="injectedFieldTypesCount"></number-label></router-link>
        </underscore-tab>
      </underscore-tabs>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    }),
    ...mapActions({
      fetchBaseFields: 'fetchBaseFields',
      fetchInjectedFieldTypes: 'fetchInjectedFieldTypes'
    })
  },
  computed: {
    ...mapGetters({
      baseFieldCount: 'getBaseFieldCount',
      injectedFieldTypesCount: 'getInjectedFieldTypesCount',
      loading: 'getBaseFieldsFetchLoading',
      loadingText: 'getBaseFieldsFetchLoadingText'
    })
  },
  created () {
    this.resetBreadcrumbs()
    this.fetchBaseFields()
    this.fetchInjectedFieldTypes()
  }
}
</script>
