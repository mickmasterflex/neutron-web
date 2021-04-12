<template>
  <div>
    <panel-template
      title="All Reasons"
      :showLoader="loading"
      :loadingText="loadingText">
      <template slot="action">
        <button @click="showCreateModal('create')" class="btn btn-turquoise"><font-awesome-icon icon="plus"></font-awesome-icon> New Reason</button>
      </template>
      <template slot="content">
        <reasons-list :reasons="allReasons"/>
      </template>
    </panel-template>
    <reason-create-update/>
  </div>
</template>

<script>
import reasonsList from '@/components/reasons/list'
import reasonCreateUpdate from '@/components/reasons/create-update'
import { mapGetters, mapActions } from 'vuex'

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
      showCreateModal: 'showReasonsCreateUpdateModal'
    })
  },
  components: {
    'reasons-list': reasonsList,
    'reason-create-update': reasonCreateUpdate
  }
}
</script>
