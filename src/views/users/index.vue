<template>
  <div>
    <user-list></user-list>
    <router-link :to="{name: 'UserCreate'}" class="btn-green btn">Create</router-link>
  </div>
</template>

<script>
import userList from '@/components/users/list'

export default {
  components: {
    'user-list': userList
  }
}
</script>
