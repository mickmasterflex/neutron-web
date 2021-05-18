<template>
  <div>
    <table v-if="buyers.length" class="table table-white capitalize">
      <thead class="thead">
        <tr>
          <th class="th lg:w-56">Buyer</th>
          <th class="th w-16">Id</th>
          <th class="th w-24">Children</th>
          <th class="th">Client</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="buyer in buyers" :key="buyer.id">
          <td class="td lg:w-56">
            <router-link class="text-link" :to="{ name: 'BuyerContract', params: { id: buyer.id, client: buyer.client_data.slug } }">
              {{ buyer.name }}
            </router-link>
          </td>
          <td class="td w-16">{{buyer.id}}</td>
          <td class="td w-24">{{buyer.children.length}}</td>
          <td class="td">
            <router-link class="text-link" :to="{ name: 'Client', params: { slug: buyer.client_data.slug } }">
              {{ buyer.client_data.name }}
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Buyers Added" copy="Edit the buyer group to add buyers" class="px-4"></table-empty-state>
  </div>
</template>

<script>
export default {
  props: {
    buyers: Array,
    buyerGroup: Number
  }
}
</script>
