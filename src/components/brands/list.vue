<template>
  <transition-table-state>
    <table v-if="brands.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">ID</th>
        <th class="th">Campuses</th>
        <th class="th">Alias</th>
        <th class="th">Website</th>
        <th class="th">Clients</th>
        <th class="th">Offers</th>
        <th class="th">Products</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="brand in brands" :key="brand.id">
        <td class="td">
          <span @click="linkToBrand(brand)" class="text-link">{{ brand.name }}</span>
        </td>
        <td class="td">{{brand.id}}</td>
        <td class="td">
          <table-link @table-link-click="linkToBrandCampuses(brand)"
                      :number="brand.campuses.length"
          ></table-link>
        </td>
        <td class="td">{{brand.alias}}</td>
        <td class="td">{{brand.website}}</td>
        <td class="td">
          <span v-if="brand.clients.length">{{ brand.clients.length }}</span>
          <span v-else class="italic text-gray-500">None</span>
        </td>
        <td class="td">
          <span v-if="brand.offer_contracts.length">{{ brand.offer_contracts.length }}</span>
          <span v-else class="italic text-gray-500">None</span>
        </td>
        <td class="td">
          <span v-if="brand.products.length">{{ brand.products.length }}</span>
          <span v-else class="italic text-gray-500">None</span>
        </td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       class="well"
                       heading="No Brands Exist"
                       key="empty"
                       copy="Use the 'New Brand' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    brands: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setCurrentBrand: 'SET_CURRENT_BRAND'
    }),
    linkToBrand (brand) {
      this.setCurrentBrand(brand)
      this.$router.push({
        name: 'BrandDetails',
        params: { id: brand.id }
      })
    },
    linkToBrandCampuses (brand) {
      this.setCurrentBrand(brand)
      this.$router.push({ name: 'BrandCampuses', params: { id: brand.id } })
    }
  }
}
</script>
