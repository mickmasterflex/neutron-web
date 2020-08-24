<template>
  <panel-template title="Banner">
    <template v-slot:action>
      <delete-banner></delete-banner>
    </template>
    <template v-slot:content>
      <div :key="banner.id" v-for="banner in brandBanners">
        <img :src="banner.image" :alt="banner.alt"/>
        <p>Version: {{banner.scale_name}}</p>
        <p>Alt: {{banner.alt}}</p>
        <p>Height: {{banner.height}}</p>
        <p>Width: {{banner.width}}</p>
        <p>Size: {{banner.size}} bytes</p>
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
