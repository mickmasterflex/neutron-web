<template>
  <div>
    <table v-if="locations.length > 0" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Location</th>
      </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="location in locations" :key="location">
          <td class="td">{{ location }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else class="well" heading="No locations have been set for this contract"/>
  </div>
</template>

<script>
export default {
  props: {
    locations: Array
  }
}
</script>
