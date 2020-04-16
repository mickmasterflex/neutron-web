<template>
  <div v-if="user">
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
    <h1 class="h1 text-white">{{user.first_name}}</h1>
      <div>
    </div>
  </div>
    <h3 class="h3 mt-5 mb-2">Delete User</h3>
    <delete-user :id="user.id"></delete-user>

    <h3 class="h3 mt-5 mb-2">Edit</h3>
    <update-user :id="user.id"></update-user>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteUser from '@/components/users/delete'
import updateUser from '@/components/users/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-user': deleteUser,
    'update-user': updateUser
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser',
      getPartnersByUser: 'getPartnersByUser'
    }),
    partners: function () {
      return this.getPartnersByUser(this.id)
    }
  },
  methods: {
    ...mapActions({
      fetchPartners: 'fetchPartners',
      fetchCurrentUser: 'fetchCurrentUser'
    })
  },
  created () {
    this.fetchCurrentUser(this.id)
    this.fetchPartners()
  }
}
</script>
