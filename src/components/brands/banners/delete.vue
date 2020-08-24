<template>
  <button class="btn btn-red" @click="runDelete()"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete Banner</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions({
      deleteBrandBanner: 'deleteBrandBanner'
    }),
    runDelete () {
      this.brandBanners.forEach(banner => {
        if (banner.brand === this.brand.id) {
          this.deleteBrandBanner(banner.id)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      brandBanners: 'getCurrentBrandBanner',
      brand: 'getCurrentBrand'
    })
  }
}
</script>
