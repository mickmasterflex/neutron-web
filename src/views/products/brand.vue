<template>
  <div v-if="brand">
    <div class="hud">
      <h1 class="h1 text-white">{{brand.name}}</h1>
    </div>
    <h3 class="h3 mt-5 mb-2">Edit Brand</h3>
    <update-brand :brand="brand"></update-brand>

    <h3 class="h3 mt-5 mb-2">Delete Brand</h3>
    <delete-brand :id="brand.id"></delete-brand>

    <div class="flex flex-row justify-between mt-4">
      <h3 class="h3">Campuses List</h3>
      <button class="btn btn-green" @click="showCreateCampusModal()">Create Campus</button>
    </div>
    <campus-list :campus="campus"></campus-list>
    <create-campus :brand="brand.id"></create-campus>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import deleteBrand from '@/components/brands/delete'
import updateBrand from '@/components/brands/update'
import createCampus from '@/components/campuses/create'
import campusList from '@/components/campuses/list'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-brand': deleteBrand,
    'update-brand': updateBrand,
    'create-campus': createCampus,
    'campus-list': campusList
  },
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand',
      campus: 'getCurrentCampus'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentBrand: 'fetchCurrentBrand',
      fetchCampuses: 'fetchCampuses'
    }),
    ...mapMutations({
      showCreateCampusModal: 'SHOW_CREATE_CAMPUS_MODAL'
    })
  },
  created () {
    this.fetchCurrentBrand(this.id)
    this.fetchCampuses()
  }
}
</script>
