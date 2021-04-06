<template>
  <div>
    <panel-template
      title="All Reasons"
      :showLoader="loading"
      :loadingText="loadingText">
      <template slot="action">
        <button @click="showCreateModal()" class="btn btn-turquoise"><font-awesome-icon icon="plus"></font-awesome-icon> New Reason</button>
      </template>
      <template slot="content">
        <reasons-list :reasons="allReasons"></reasons-list>
      </template>
    </panel-template>
    <reason-create></reason-create>
  </div>
</template>

<script>
import reasonsList from '@/components/reasons/list'
import reasonCreate from '@/components/reasons/create'
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
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS',
      showCreateModal: 'SHOW_CREATE_REASON_MODAL'
    })
  },
  created () {
    this.resetBreadcrumbs()
    this.fetchReasons()
  },
  components: {
    'reasons-list': reasonsList,
    'reason-create': reasonCreate
  }
}
</script>
