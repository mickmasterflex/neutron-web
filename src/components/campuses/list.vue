<template>
  <div>
    <table v-if="campuses" class="table">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">Is Online</th>
        <th class="th">Campus Address</th>
        <th class="th">Phone Number</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="campus in campuses" :key="campus.id">
        <td class="td">
          <router-link :to="{name: 'Campus', params: {brand:campus.brand, id:campus.id}}" class="text-link">{{campus.name}}</router-link>
        </td>
        <td class="td">{{campus.is_online}}</td>
        <td class="td">{{campus.address1}} {{campus.address2}}</td>
        <td class="td">{{campus.phone_number}}</td>
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
    campuses: {
      type: Array
    }
  }
}
</script>
