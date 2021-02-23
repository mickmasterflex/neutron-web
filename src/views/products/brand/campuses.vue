<template>
  <div>
    <panel-template title="Campuses List" :showLoader="loading" :loadingText="loadingText" content-background-color="white">
      <template slot="action">
        <button class="btn btn-turquoise" @click="showCreateCampusModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Campus</button>
      </template>
      <template slot="content">
        <campus-list :campuses="campuses"></campus-list>
      </template>
    </panel-template>
    <create-campus :brandId="brand.id" v-if="brand.id"></create-campus>
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
      getCampusesByBrand: 'getCampusesByBrand',
      loading: 'getCampusesFetchLoading',
      loadingText: 'getCampusesFetchLoadingText'
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
