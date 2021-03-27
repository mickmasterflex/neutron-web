<template>
  <div>
    <panel-template title="Client List" :show-loader="loading" :loading-text="loadingText" content-background-color="white">
      <template slot="action">
        <button class="btn btn-turquoise" @click="showCreateClientModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Client</button>
      </template>
      <template slot="content">
        <client-list :clients="clients"></client-list>
      </template>
    </panel-template>
    <create-client></create-client>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import clientList from '@/components/clients/list'
import createClient from '@/components/clients/create'

export default {
  components: {
    'client-list': clientList,
    'create-client': createClient
  },
  computed: {
    ...mapGetters({
      clients: 'getAllClients',
      loading: 'getClientsFetchLoading',
      loadingText: 'getClientsFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchClients: 'fetchClients'
    }),
    ...mapMutations({
      showCreateClientModal: 'SHOW_CREATE_CLIENT_MODAL',
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    })
  },
  created () {
    this.resetBreadcrumbs()
    this.fetchClients()
  }
}
</script>
