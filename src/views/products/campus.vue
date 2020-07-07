<template>
  <div v-if="campus">
    <div class="hud">
      <h1 class="h1 text-white">{{campus.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="campus.id" :title="`Campus`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Edit Campus</h3>
    <update-campus :campus="campus"></update-campus>

    <h3 class="h3 mt-5 mb-2">Delete Campus</h3>
    <delete-campus :brand="campus.brand" :id="id"></delete-campus>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteCampus from '@/components/campuses/delete'
import updateCampus from '@/components/campuses/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-campus': deleteCampus,
    'update-campus': updateCampus
  },
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus',
      brands: 'getCurrentBrand',
      getCampusesByBrand: 'getCampusesByBrand'
    }),
    campuses: function () {
      return this.getCampusesByBrand(this.id)
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentCampus: 'fetchCurrentCampus',
      fetchBrands: 'fetchBrands'
    })
  },
  created () {
    this.fetchCurrentCampus(this.id)
    this.fetchBrands()
  }
}
</script>
