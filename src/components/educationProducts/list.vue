<template>
  <div>
    <table v-if="educationProducts" class="table">
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
        <td class="td">{{educationProduct.campusId}}</td>
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
  props: {
    educationProducts: {
      type: Array
    }
  }
}
</script>
