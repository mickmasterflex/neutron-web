<template>
  <base-panel-grid>
    <update-brand :brand="brand" class="col-span-2 xl:col-span-1"></update-brand>
    <div class="hidden xl:block xl:col-span-1"></div>

    <brand-logos v-show="brandLogos.length" class="col-span-2"></brand-logos>
    <upload-logo v-show="!brandLogos.length" class="col-span-2 xl:col-span-1"></upload-logo>

    <brand-banners v-show="brandBanners.length" class="col-span-2"></brand-banners>
    <upload-banner v-show="!brandBanners.length" class="col-span-2 xl:col-span-1"></upload-banner>

    <panel-template title="Danger Zone" :showLoader="loading" :loadingText="loadingText" class="col-span-2">
      <template #content>
        <delete-brand :id="brand.id"></delete-brand>
      </template>
    </panel-template>
  </base-panel-grid>
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
      brandBanners: 'getCurrentBrandBanners',
      loading: 'getBrandFetchLoading',
      loadingText: 'getBrandFetchLoadingText'
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
