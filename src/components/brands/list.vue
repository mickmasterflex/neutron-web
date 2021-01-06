<template>
  <transition-table-state>
    <table v-if="brands.length" class="table table-white">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">ID</th>
        <th class="th">Short Description</th>
        <th class="th">Alias</th>
        <th class="th">Website</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="brand in brands" :key="brand.id">
        <td class="td">
          <span @click="linkToBrand(brand)" class="text-link">{{ brand.name }}</span>
        </td>
        <td class="td">{{brand.id}}</td>
        <td class="td">{{brand.short_description}}</td>
        <td class="td">{{brand.alias}}</td>
        <td class="td">{{brand.website}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No Brands Exist"
                       key="empty"
                       copy="Use the 'New Brands' button to get started."></table-empty-state>
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
    }
  }
}
</script>
