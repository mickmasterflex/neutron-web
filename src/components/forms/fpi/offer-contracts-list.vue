<template>
  <div>
    <table v-if="offers.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Id</th>
        <th class="th">Product</th>
        <th class="th">Brand</th>
        <th class="th">Vertical</th>
        <th class="th">Status</th>
      </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="offer in offers" :key="offer.offer_contract_id">
          <td class="td">{{ offer.offer_contract_id }}</td>
          <td class="td">{{ offer.product }}</td>
          <td class="td">{{ offer.brand }}</td>
          <td class="td">{{ offer.vertical }}</td>
          <td class="td">{{ offer.status }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else class="well" heading="No active offers are included on this contract"/>
  </div>
</template>

<script>
export default {
  props: {
    offers: Array
  }
}
</script>
