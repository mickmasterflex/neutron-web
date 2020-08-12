<template>
  <div>
    <h3 class="h3 mb-2">Update Brand</h3>
    <update-brand :brand="brand" ></update-brand>

    <brand-logos v-if="brandLogos.length"></brand-logos>
    <upload-logo v-if="!brandLogos.length"></upload-logo>

    <h3 class="h3 mt-5 mb-2">Delete Brand</h3>
    <delete-brand :id="brand.id"></delete-brand>
  </div>
</template>

<script>
import deleteBrand from '@/components/brands/delete'
import updateBrand from '@/components/brands/update'
import brandLogos from '@/components/brands/logos/list'
import uploadLogo from '@/components/brands/logos/upload'
import { mapGetters } from 'vuex'

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
  }
}
</script>
