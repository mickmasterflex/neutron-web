<template>
  <table class="table table-white table-shadow w-auto">
    <thead>
      <tr>
        <th class="th">Location</th>
        <th class="th">In Recruitment Area</th>
      </tr>
    </thead>
    <tbody class="tbody">
      <list-item v-for="location in found" :key="location" :location="location" :found="true"></list-item>
      <list-item v-for="location in notFound" :key="location" :location="location" :found="false"></list-item>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import listItem from '@/components/geos/search-locations/result-list-item'

export default {
  computed: {
    ...mapGetters({
      results: 'getLocationsSearchResults'
    }),
    found () {
      return this.results.found
    },
    notFound () {
      return this.results.not_found
    }
  },
  components: {
    'list-item': listItem
  }
}
</script>
