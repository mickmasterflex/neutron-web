<template>
  <transition-table-state>
    <table v-if="educationProducts" class="table table-white">
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
          <router-link :to="{name: 'EducationProduct', params: {campus:educationProduct.campus, id:educationProduct.id}}" class="text-link">{{educationProduct.name}}</router-link>
        </td>
        <td class="td">{{educationProduct.description}}</td>
        <td class="td">{{educationProduct.id}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       class="well"
                       heading="No Education Products Exist"
                       key="empty"
                       copy="Use the 'New Education Product' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
export default {
  props: {
    educationProducts: {
      type: Array
    }
  }
}
</script>
