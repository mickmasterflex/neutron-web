<template>
  <div>
    <table v-if="campuses" class="table">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">ID</th>
        <th class="th">Short Description</th>
        <th class="th">Vertical</th>
        <th class="th">address1</th>
        <th class="th">address2</th>
        <th class="th">city</th>
        <th class="th">state</th>
        <th class="th">Postal Code</th>
        <th class="th">Phone Type</th>
        <th class="th">Phone Number</th>
        <th class="th">Phone Extension</th>
        <th class="th">Description</th>
        <th class="th">Brand</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="campus in campuses" :key="campus.id">
        <td class="td">
          <router-link :to="{name: 'Campus', params: {id:campus.id}}" class="text-link">{{campus.name}}</router-link>
        </td>
        <td class="td">{{campus.id}}</td>
        <td class="td">{{campus.short_description}}</td>
        <td class="td">{{campus.vertical}}</td>
        <td class="td">{{campus.address1}}</td>
        <td class="td">{{campus.address2}}</td>
        <td class="td">{{campus.city}}</td>
        <td class="td">{{campus.state}}</td>
        <td class="td">{{campus.postal_code}}</td>
        <td class="td">{{campus.phone_type}}</td>
        <td class="td">{{campus.phone_number}}</td>
        <td class="td">{{campus.phone_extension}}</td>
        <td class="td">{{campus.description}}</td>
        <td class="td">{{campus.brand}}</td>
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
    campuses: {
      type: Object,
      required: true
    }
  }
}
</script>
