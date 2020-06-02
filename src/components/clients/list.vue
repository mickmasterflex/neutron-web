<template>
  <div>
    <table v-if="clients" class="table">
      <thead>
        <tr class="th-row">
          <th class="th">Name</th>
          <th class="th">ID</th>
          <th class="th">Slug</th>
          <th class="th">Buyer Contracts</th>
          <th class="th">Partner Contracts</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="client in clients" :key="client.id">
          <td class="td">
            <router-link :to="{name: 'Client', params: {id:client.id}}" class="text-link">{{client.name}}</router-link>
          </td>
          <td class="td">{{client.id}}</td>
          <td class="td">{{client.slug}}</td>
          <td class="td">{{client.buyercontract_set.length}}</td>
          <td class="td">{{client.partnercontract_set.length}}</td>
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
  props: ['clients']
}
</script>
