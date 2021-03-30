<template>
  <panel-template title="Product Details" :show-loader="loading" :loading-text="loadingText">
    <template v-slot:content>
      <transition-table-state>
        <table class="table table-white" v-if="tableData.brand">
          <thead class="thead">
            <tr class="tr">
              <th class="th w-24">Data</th>
              <th class="th">Name</th>
              <th class="th w-24">Id</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tr">
              <td class="td font-bold">Brand</td>
              <td class="td">
                <router-link class="text-link"
                             :to="{ name: 'BrandDetails', params: { id: tableData.brand.id } }">
                  {{ tableData.brand.name }}
                </router-link>
              </td>
              <td class="td">{{ tableData.brand.id }}</td>
            </tr>
            <tr class="tr">
              <td class="td font-bold">Campus</td>
              <td class="td">
                <router-link class="text-link"
                             :to="{ name: 'CampusDetails', params: { id: tableData.campus.id, brand: tableData.brand.id } }">
                  {{ tableData.campus.name }}
                </router-link>
              </td>
              <td class="td">{{ tableData.campus.id }}</td>
            </tr>
            <tr class="tr">
              <td class="td font-bold">Product</td>
              <td class="td">
                <router-link class="text-link"
                             :to="{ name: 'ProductDetails', params: { id: tableData.product.id, campus: tableData.campus.id, brand: tableData.brand.id } }">
                  {{ tableData.product.name }}
                </router-link>
              </td>
              <td class="td">{{ tableData.product.id }}</td>
            </tr>
          </tbody>
        </table>
        <table-empty-state v-else
                           heading="No Product Data"
                           key="empty"></table-empty-state>
      </transition-table-state>
    </template>
  </panel-template>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    tableData: {
      default: () => {
        return {}
      },
      type: Object
    },
    title: String
  },
  computed: {
    ...mapGetters({
      loading: 'getLeadFetchLoading',
      loadingText: 'getLeadFetchLoadingText'
    })
  }
}
</script>
