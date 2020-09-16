<template>
    <panel-template title="Deliveries">
      <template v-slot:action>
        <button class="btn btn-turquoise">Add Delivery</button>
      </template>
      <template v-slot:content>
        <table v-if="deliveries" class="table">
          <thead>
          <tr>
            <th class="th">Type</th>
            <th class="th">Response Parser</th>
            <th class="th">Target</th>
            <th class="th"></th>
          </tr>
          </thead>
          <tbody class="tbody">
          <tr class="tr" v-for="delivery in deliveries" :key="delivery.id">
            <td class="td">{{ delivery.type }}</td>
            <td class="td">{{ delivery.response_parser }}</td>
            <td class="td">{{ delivery.target }}</td>
            <td class="td"><button>Update Delivery</button></td>
          </tr>
          </tbody>
        </table>
        <div v-else>
          <p>No Deliveries Found :(</p>
        </div>
      </template>
    </panel-template>
</template>

<script>
export default {
  props: {
    deliveries: Array
    // buyer: String
  }
}
</script>
