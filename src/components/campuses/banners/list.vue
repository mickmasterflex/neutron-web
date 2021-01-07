<template>
  <panel-template title="Banner"
                  :showLoader="campusLoading ? campusLoading : bannersLoading"
                  :loadingText="campusLoadingText ? campusLoadingText : bannersLoadingText">
    <template v-slot:action>
      <delete-banner></delete-banner>
    </template>
    <template v-slot:content>
      <div :key="banner.id" v-for="banner in campusBanners" class="image-meta-li">
        <div class="img-container">
          <img :src="banner.image" :alt="banner.alt"/>
        </div>
        <ul class="img-meta">
          <li class="h4 capitalize">{{banner.scale_name}}</li>
          <li>Alt: {{banner.alt}}</li>
          <li>Height: {{banner.height}}</li>
          <li>Width: {{banner.width}}</li>
          <li>Size: {{banner.total_size}} bytes</li>
        </ul>
      </div>
    </template>
  </panel-template>
</template>

<script>
import { mapGetters } from 'vuex'
import deleteBanner from '@/components/campuses/banners/delete'

export default {
  computed: {
    ...mapGetters({
      campusBanners: 'getCurrentCampusBanners',
      campusLoading: 'getCampusFetchLoading',
      campusLoadingText: 'getCampusFetchLoadingText',
      bannersLoading: 'getCampusBannersFetchLoading',
      bannersLoadingText: 'getCampusBannersFetchLoadingText'
    })
  },
  components: {
    'delete-banner': deleteBanner
  }
}
</script>
