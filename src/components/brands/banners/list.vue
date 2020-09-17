<template>
  <panel-template title="Banner">
    <template v-slot:action>
      <delete-banner></delete-banner>
    </template>
    <template v-slot:content>
      <div :key="banner.id" v-for="banner in brandBanners" class="image-meta-li">
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
import deleteBanner from '@/components/brands/banners/delete'

export default {
  computed: {
    ...mapGetters({
      brandBanners: 'getCurrentBrandBanners'
    })
  },
  components: {
    'delete-banner': deleteBanner
  }
}
</script>
