<template>
  <div>
    <update-brand :brand="brand" ></update-brand>

    <brand-logos v-show="brandLogos.length"></brand-logos>
    <upload-logo v-show="!brandLogos.length"></upload-logo>

    <delete-brand :id="brand.id" class="mt-4"></delete-brand>
  </div>
</template>

<script>
import deleteBrand from '@/components/brands/delete'
import updateBrand from '@/components/brands/update'
import brandLogos from '@/components/brands/logos/list'
import uploadLogo from '@/components/brands/logos/upload'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand',
      brandLogos: 'getCurrentBrandLogos'
    })
  },
  components: {
    'brand-logos': brandLogos,
    'upload-logo': uploadLogo,
    'delete-brand': deleteBrand,
    'update-brand': updateBrand
  },
  created () {
    this.fetchLogos(this.brand.id)
  },
  methods: {
    ...mapActions({
      fetchLogos: 'fetchCurrentBrandLogos'
    })
  }
}
</script>
