<template>
  <transition-table-state>
    <table v-if="offers.length" class="table table-white">
      <thead>
        <tr>
          <th class="th">Name</th>
          <th class="th">ID</th>
          <th class="th">Contract</th>
          <th class="th">Product</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="offer in this.offers" :key="offer.id">
          <td class="td">
            <router-link :to="{name: 'Offer', params: { client: client, buyer:offer.contract, id:offer.id }}" class="underline text-blue-500">{{offer.name}}</router-link>
          </td>
          <td class="td">{{ offer.id }}</td>
          <td class="td">{{ offer.contract }}</td>
          <td class="td">{{ offer.product }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No Offers Added"
                       key="empty"
                       copy="Use the 'New Offer' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
export default {
  props: {
    offers: Array,
    client: String
  }
}
</script>
