<template>
  <div>
    <create-user></create-user>
  </div>
</template>

<script>
import createUser from '../../components/accounts/create'

export default {
  name: 'CreateUser',
  components: {
    createUser
  }
}
</script>
