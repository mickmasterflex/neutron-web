<template>
  <panel-template title="All Reasons" :showLoader="loading" :loadingText="loadingText">
    <template slot="content">
      <reasons-list :reasons="allReasons"></reasons-list>
    </template>
  </panel-template>
</template>

<script>
import reasonsList from '@/components/reasons/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      allReasons: 'getAllReasons',
      loading: 'getReasonsFetchLoading',
      loadingText: 'getReasonsFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchReasons: 'fetchReasons'
    }),
    ...mapMutations({
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    })
  },
  created () {
    this.resetBreadcrumbs()
    this.fetchReasons()
  },
  components: {
    'reasons-list': reasonsList
  }
}
</script>
