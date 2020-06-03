<template>
  <div>
  <table v-if="users" class="table">
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
          <router-link :to="{name: 'User', params: {id:user.id}}" class="text-link">
            {{ user.email }}
          </router-link>
        </td>
        <td class="td">{{ user.first_name }} {{ user.last_name }}</td>
        <td class="td">{{ user.id }}</td>
      </tr>
    </tbody>
  </table>
  <div v-else>
    ...Loading...
  </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array
    }
  }
}
</script>
