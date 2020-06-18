<template>
  <div>
    <table v-if="campaigns" class="table">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">ID</th>
        <th class="th">Product Description </th>
        <th class="th">Product Group</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="product in this.products" :key="product.id">
        <td class="td">
          <router-link :to="{name: 'Product', params: { client: product.client, partner:product.contract, id:product.id}}" class="underline text-blue-500">{{product.name}}</router-link>
        </td>
        <td class="td">{{ product.id }}</td>
        <td class="td">{{ product.short_description }}</td>
        <td class="td">{{ product.product_group }}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>
export default {
  props: { products: Array }
}
</script>
