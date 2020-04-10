<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
    <h1 class="h1 text-white">{{user.name}}</h1>
      <div>
      <stat-card :data="userCount" :title="`Users`" :color="`teal`"></stat-card>
    </div>
  </div>
  </div>
</template>

<script>
import axios from '@/axios'
import deleteUser from '@/components/users/delete'
import updateUser from '@/components/users/update'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      output: null,
      user: {
        email: '',
        first_name: '',
        last_name: '',
        is_staff: null
      }
    }
  },
  props: ['id'],
  computed: {
    userCount: function () {
      return this.user.length
    },
    components: {
      'delete-user': deleteUser,
      'update-user': updateUser
    },
    methods: {
      getUser () {
        axios
          .get(`/users/${this.id}/`)
          .then(response => {
            this.output = response
            this.user = response.data
          })
          .catch(error => {
            this.output = error
            this.errored = true
          })
      }
    }
  }
}
</script>
