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
  components: {
    'delete-campus': deleteCampus,
    'update-campus': updateCampus,
    'campus-logos': campusLogos,
    'upload-logo': uploadLogo
  },
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus',
      campusLogos: 'getCurrentCampusLogos'
    })
  },
  created () {
    this.fetchLogos(this.campus.id)
  },
  methods: {
    ...mapActions({
      fetchLogos: 'fetchCurrentCampusLogos'
    })
  }
}
</script>
