<template>
  <div>
    <h3 class="text-2xl font-hairline mb-2">Create User</h3>
    <create-user></create-user>
  </div>
</template>

<script>
import createUser from '../../components/users/create'

export default {
  name: 'CreateUser',
  components: {
    'create-user': createUser
  }
}
</script>
