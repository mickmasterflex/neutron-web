<template>
  <div>
    <update-brand :brand="brand" ></update-brand>

    <brand-logos v-show="brandLogos.length"></brand-logos>
    <upload-logo v-show="!brandLogos.length"></upload-logo>

    <brand-banners v-show="brandBanners.length"></brand-banners>
    <upload-banner v-show="!brandBanners.length"></upload-banner>

    <delete-brand :id="brand.id" class="mt-4"></delete-brand>
  </div>
</template>

<script>
import deleteBrand from '@/components/brands/delete'
import updateBrand from '@/components/brands/update'
import brandLogos from '@/components/brands/logos/list'
import uploadLogo from '@/components/brands/logos/upload'
import brandBanners from '@/components/brands/banners/list'
import uploadBanner from '@/components/brands/banners/upload'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand',
      brandLogos: 'getCurrentBrandLogos',
      brandBanners: 'getCurrentBrandBanners'
    })
  },
  components: {
    'brand-logos': brandLogos,
    'upload-logo': uploadLogo,
    'brand-banners': brandBanners,
    'upload-banner': uploadBanner,
    'delete-brand': deleteBrand,
    'update-brand': updateBrand
  },
  watch: {
    brand () {
      if (this.brand) {
        this.fetchLogos(this.brand.id)
        this.fetchBanners(this.brand.id)
      }
    }
  },
  methods: {
    ...mapActions({
      fetchLogos: 'fetchCurrentBrandLogos',
      fetchBanners: 'fetchCurrentBrandBanners'
    })
  }
}
</script>
