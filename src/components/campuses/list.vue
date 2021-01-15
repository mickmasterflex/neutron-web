<template>
  <transition-table-state>
    <table v-if="campuses.length" class="table table-white">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">Is Online</th>
        <th class="th">Campus Address</th>
        <th class="th">Phone Number</th>
        <th class="th">Products</th>
        <th class="th">Clients</th>
        <th class="th">Offers</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="campus in campuses" :key="campus.id">
        <td class="td">
          <span @click="linkToCampus(campus)" class="text-link">{{campus.name}}</span>
        </td>
        <td class="td">{{campus.is_online}}</td>
        <td class="td">{{campus.address1}} {{campus.address2}}</td>
        <td class="td">{{campus.phone_number}}</td>
        <td class="td">
          <table-link @table-link-click="linkToCampusProducts(campus)">{{ campus.products.length }} </table-link>
        </td>
        <td class="td">
              <span v-if="campus.clients.length">{{ campus.clients.length }}</span>
          <span v-else class="italic text-gray-500">None</span>
        </td>
        <td class="td">
          <span v-if="campus.offer_contracts.length">{{ campus.offer_contracts.length }}</span>
          <span v-else class="italic text-gray-500">None</span>
        </td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No Campuses Exist"
                       key="empty"
                       copy="Use the 'New Campus' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    campuses: {
      type: Array
    }
  },
  methods: {
    ...mapMutations({
      setCurrentCampus: 'SET_CURRENT_CAMPUS'
    }),
    linkToCampus (campus) {
      this.setCurrentCampus(campus)
      this.$router.push({
        name: 'CampusDetails',
        params: { brand: campus.brand, id: campus.id }
      })
    },
    linkToCampusProducts (campus) {
      this.setCurrentCampus(campus)
      this.$router.push({ name: 'CampusProducts', params: { brand: campus.brand, id: campus.id } })
    }
  }
}
</script>
