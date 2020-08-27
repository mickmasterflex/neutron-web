<template>
  <div>
    <update-campus :campus="campus"></update-campus>

    <campus-logos v-show="campusLogos.length"></campus-logos>
    <upload-logo v-show="!campusLogos.length"></upload-logo>

    <delete-campus :campus="campus" class="mt-4"></delete-campus>
  </div>
</template>

<script>
import deleteCampus from '@/components/campuses/delete'
import updateCampus from '@/components/campuses/update'
import campusLogos from '@/components/campuses/logos/list'
import uploadLogo from '@/components/campuses/logos/upload'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus',
      campusLogos: 'getCurrentCampusLogos'
    })
  },
  components: {
    'delete-campus': deleteCampus,
    'update-campus': updateCampus,
    'campus-logos': campusLogos,
    'upload-logo': uploadLogo
  },
  watch: {
    campus () {
      if (this.campus) {
        this.fetchLogos(this.campus.id)
      }
    }
  },
  methods: {
    ...mapActions({
      fetchLogos: 'fetchCurrentCampusLogos'
    })
  }
}
</script>
