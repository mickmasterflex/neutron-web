<template>
  <button class="btn btn-red" @click="runDelete()"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete Logo</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions({
      deleteBrandLogo: 'deleteBrandLogo'
    }),
    runDelete () {
      this.brandLogos.forEach(logo => {
        if (logo.brand === this.brand.id) {
          this.deleteBrandLogo(logo.id)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      brandLogos: 'getCurrentBrandLogos',
      brand: 'getCurrentBrand'
    })
  }
}
</script>
