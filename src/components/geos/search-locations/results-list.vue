<template>
  <div class="well overflow-y-scroll block max-h-500">
    <table class="table table-white table-shadow w-auto">
      <thead>
        <tr>
          <th class="th">Location</th>
          <th class="th">In Recruitment Area</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <list-item v-for="(location, index) in found" :key="'found-' + index" :location="location" :found="true"></list-item>
        <list-item v-for="(location, index) in notFound" :key="'not-found-' + index" :location="location" :found="false"></list-item>
      </tbody>
    </table>
  </div>
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
