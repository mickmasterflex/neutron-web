<template>
  <div>
    <account-list></account-list>
    <router-link :to="{name: 'AccountCreate'}" class="btn-green btn">Create</router-link>
  </div>
</template>

<script>
import accountList from '../../components/accounts/list'

export default {
  components: {
    accountList
  }
}
</script>
