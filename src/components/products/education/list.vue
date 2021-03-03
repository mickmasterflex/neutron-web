<template>
  <transition-table-state>
    <table v-if="educationProducts.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">Product Id</th>
        <th class="th">Clients</th>
        <th class="th">Offers</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="educationProduct in educationProducts" :key="educationProduct.id">
        <td class="td">
          <span @click="linkToProduct(educationProduct)" class="text-link">{{educationProduct.name}}</span>
        </td>
        <td class="td">{{educationProduct.id}}</td>
        <td class="td">
          <span v-if="educationProduct.clients.length">{{ educationProduct.clients.length }}</span>
          <span v-else class="italic text-gray-500">None</span>
        </td>
        <td class="td">
          <table-link @table-link-click="linkToProductOffers(educationProduct)"
                      :number="educationProduct.offer_contracts.length"
          ></table-link>
        </td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No Education Products Exist"
                       key="empty"
                       class="well"
                       copy="Use the 'New Education Product' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    educationProducts: {
      type: Array
    }
  },
  methods: {
    ...mapMutations({
      setCurrentEduProduct: 'SET_CURRENT_EDUCATION_PRODUCT'
    }),
    linkToProduct (product) {
      this.setCurrentEduProduct(product)
      this.$router.push({
        name: 'ProductDetails',
        params: { campus: product.campus, id: product.id }
      })
    },
    linkToProductOffers (product) {
      this.setCurrentEduProduct(product)
      this.$router.push({ name: 'ProductOffers', params: { id: product.id } })
    }
  }
}
</script>
