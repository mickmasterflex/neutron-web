<template>
  <transition-table-state>
    <table v-if="users.length" class="table table-striped">
      <thead>
        <tr>
          <th class="th">Email</th>
          <th class="th">Name</th>
          <th class="th">ID</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="user in users" :key="user.id">
          <td class="td">
            <span @click="linkToUser(user)" class="text-link">{{ user.email }}</span>
          </td>
          <td class="td">{{ user.first_name }} {{ user.last_name }}</td>
          <td class="td">{{ user.id }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No Users Exist"
                       key="empty"
                       copy="Use the 'New User' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    users: {
      type: Array
    }
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_USER'
    }),
    ...mapGetters({
      currentActiveUser: 'SET_CURRENT_ACTIVE_USER'
    }),
    linkToUser (user) {
      if (this.currentActiveUser.id === user.id) {
        this.$router.push({
          name: 'My Account',
          params: { id: user.id }
        })
      } else {
        this.setCurrent(user)
        this.$router.push({
          name: 'User',
          params: { id: user.id }
        })
      }
    }
  }
}
</script>
