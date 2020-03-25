<template>
  <div>
    <h3>Relationships</h3>
    <client-list></client-list>
    <create-client></create-client>
  </div>
</template>

<script>
import clientList from '../../components/relationships/list'
import createClient from '../../components/relationships/createClient'

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
