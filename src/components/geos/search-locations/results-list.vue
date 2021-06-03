<template>
  <div class="well overflow-y-scroll block max-h-500">
    <table class="table table-white w-auto">
      <thead>
        <tr>
          <th class="th">Code</th>
          <th class="th">Name</th>
          <th class="th">In Recruitment Area</th>
          <th class="th">Inherited</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <list-item v-for="(location, index) in found"
                   :key="'found-' + index"
                   :location="location"
                   :found="true"
        />
        <list-item v-for="(location, index) in foundInherited"
                   :key="'found-inherited-' + index"
                   :location="location"
                   :found="true"
                   :inherited="true"
        />
        <list-item v-for="(location, index) in notFound"
                   :key="'not-found-' + index"
                   :location="location"
                   :found="false"
        />
        <list-item v-for="(location, index) in invalidLocations"
                   :key="'invalid-location-' + index"
                   :location="location"
                   :found="false"
                   :invalid="true"
        />
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
      return this.results.valid_locations
    },
    foundInherited () {
      return this.results.inherited_locations
    },
    notFound () {
      return this.results.not_found_locations
    },
    invalidLocations () {
      return this.results.invalid_locations
    }
  },
  components: {
    'list-item': listItem
  }
}
</script>
