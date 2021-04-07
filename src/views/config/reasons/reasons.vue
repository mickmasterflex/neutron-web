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
    <reason-update></reason-update>
  </div>
</template>

<script>
import reasonsList from '@/components/reasons/list'
import reasonCreate from '@/components/reasons/create'
import reasonUpdate from '@/components/reasons/update'
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      allReasons: 'getAllReasons',
      loading: 'getReasonsFetchLoading',
      loadingText: 'getReasonsFetchLoadingText'
    })
  },
  methods: {
    ...mapMutations({
      showCreateModal: 'SHOW_CREATE_REASON_MODAL'
    })
  },
  components: {
    'reasons-list': reasonsList,
    'reason-create': reasonCreate,
    'reason-update': reasonUpdate
  }
}
</script>
