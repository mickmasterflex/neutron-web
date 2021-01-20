<template>
  <transition-table-state>
    <table v-if="educationProducts.length" class="table table-white">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">Description</th>
        <th class="th">Product Id</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="educationProduct in educationProducts" :key="educationProduct.id">
        <td class="td">
          <span @click="linkToProduct(educationProduct)" class="text-link">{{educationProduct.name}}</span>
        </td>
        <td class="td">{{educationProduct.description}}</td>
        <td class="td">{{educationProduct.id}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No Education Products Exist"
                       key="empty"
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
    }
  }
}
</script>
