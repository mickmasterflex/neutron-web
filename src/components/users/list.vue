<template>
  <div>
  <table v-if="users" class="w-full">
    <tr class="th-row">
      <th class="th">Email</th>
      <th class="th">Name</th>
      <th class="th">ID</th>
    </tr>
    <tr v-for="user in users" :key="user.id">
      <td class="td">
        <router-link :to="{name: 'User', params: {id:user.id}}" class="underline text-blue-500">
          {{ user.email }}
        </router-link>
      </td>
      <td>{{ user.first_name }} {{ user.last_name }}</td>
      <td>{{ user.id }}</td>
    </tr>
  </table>
  <div v-else>
    ...Loading...
  </div>
  </div>
</template>

<script>
export default {
  props: ['users']
}
</script>
