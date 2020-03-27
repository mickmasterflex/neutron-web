<template>
  <div>
    <create-user></create-user>
  </div>
</template>

<script>
import createUser from '../../components/users/create'

export default {
  name: 'CreateUser',
  components: {
    createUser
  }
}
</script>
