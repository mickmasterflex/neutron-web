<template>
  <brand-layout :id="id" contentTab="campuses">
    <template v-slot:content>
      <div class="flex flex-row justify-between">
        <h3 class="h3">Campuses List</h3>
        <button class="btn btn-green" @click="showCreateCampusModal()">Create Campus</button>
      </div>
      <campus-list :campuses="campuses"></campus-list>
      <create-campus :brand="brand.id"></create-campus>
    </template>
  </brand-layout>
</template>

<script>
import brandLayout from '@/views/products/brand/layout'
import createCampus from '@/components/campuses/create'
import campusList from '@/components/campuses/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'brand-layout': brandLayout,
    'create-campus': createCampus,
    'campus-list': campusList
  },
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand',
      getCampusesByBrand: 'getCampusesByBrand'
    }),
    campuses: function () {
      return this.getCampusesByBrand(this.id)
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
