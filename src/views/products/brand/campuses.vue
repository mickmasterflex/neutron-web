<template>
  <div>
    <div class="flex flex-row justify-between">
      <h3 class="h3">Campuses List</h3>
      <button class="btn btn-green" @click="showCreateCampusModal()">Create Campus</button>
    </div>
    <campus-list :campuses="campuses"></campus-list>
    <create-campus :brandId="brand.id"></create-campus>
  </div>
</template>

<script>
import createCampus from '@/components/campuses/create'
import campusList from '@/components/campuses/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'create-campus': createCampus,
    'campus-list': campusList
  },
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand',
      getCampusesByBrand: 'getCampusesByBrand'
    }),
    campuses: function () {
      return this.getCampusesByBrand(this.brand.id)
    }
  },
  methods: {
    ...mapActions({
      fetchCampuses: 'fetchCampuses'
    }),
    ...mapMutations({
      showCreateCampusModal: 'SHOW_CREATE_CAMPUS_MODAL'
    })
  },
  created () {
    this.fetchCampuses()
  }
}
</script>
