<template>
  <div>
    <update-campus :campus="campus"></update-campus>

    <campus-logos v-show="campusLogos.length"></campus-logos>
    <upload-logo v-show="!campusLogos.length"></upload-logo>

    <campus-banners v-show="campusBanners.length"></campus-banners>
    <upload-banner v-show="!campusBanners.length"></upload-banner>

    <delete-campus :campus="campus" class="mt-4"></delete-campus>
  </div>
</template>

<script>
import deleteCampus from '@/components/campuses/delete'
import updateCampus from '@/components/campuses/update'
import campusLogos from '@/components/campuses/logos/list'
import uploadLogo from '@/components/campuses/logos/upload'
import campusBanners from '@/components/campuses/banners/list'
import uploadBanner from '@/components/campuses/banners/upload'

import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus',
      campusLogos: 'getCurrentCampusLogos',
      campusBanners: 'getCurrentCampusBanners'
    })
  },
  components: {
    'delete-campus': deleteCampus,
    'update-campus': updateCampus,
    'campus-logos': campusLogos,
    'upload-logo': uploadLogo,
    'campus-banners': campusBanners,
    'upload-banner': uploadBanner
  },
  watch: {
    campus () {
      if (this.campus) {
        this.fetchLogos(this.campus.id)
        this.fetchBanners(this.campus.id)
      }
    }
  },
  methods: {
    ...mapActions({
      fetchLogos: 'fetchCurrentCampusLogos',
      fetchBanners: 'fetchCurrentCampusBanners'
    })
  }
}
</script>
