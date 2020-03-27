<template>
  <div>
    <h3>Relationships</h3>
    <client-list></client-list>
    <create-client></create-client>
  </div>
</template>

<script>
import clientList from '../../components/clients/list'
import createClient from '../../components/clients/create'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  components: {
    clientList,
    createClient
  }
}
</script>
