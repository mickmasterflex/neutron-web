<template>
  <div v-if="campus">
    <div class="hud">
      <h1 class="h1 text-white">{{campus.name}}</h1>
    </div>
    <h3 class="h3 mt-5 mb-2">Edit Campus</h3>
    <update-campus :campus="campus"></update-campus>

    <h3 class="h3 mt-5 mb-2">Delete Campus</h3>
    <delete-campus :id="campus.id"></delete-campus>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import deleteCampus from '@/components/campus/delete'
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
      campus: 'getCurrentCampus'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentCampus: 'fetchCurrentCampus'
    }),
    ...mapMutations({
      showCreateCampusModal: 'SHOW_CREATE_CAMPUS_MODAL'
    })
  },
  created () {
    this.fetchCurrentCampus(this.id)
  }
}
</script>
