<template>
  <base-panel-grid>
    <update-campus :campus="campus" class="col-span-2 xl:col-span-1"></update-campus>
    <div class="hidden xl:block xl:col-span-1"></div>

    <campus-logos v-show="campusLogos.length" class="col-span-2"></campus-logos>
    <upload-logo v-show="!campusLogos.length" class="col-span-2 xl:col-span-1"></upload-logo>

    <campus-banners v-show="campusBanners.length" class="col-span-2"></campus-banners>
    <upload-banner v-show="!campusBanners.length" class="col-span-2 xl:col-span-1"></upload-banner>

    <panel-template title="Danger Zone" class="col-span-2">
      <template #content>
        <delete-campus :campus="campus"></delete-campus>
      </template>
    </panel-template>
  </base-panel-grid>
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
