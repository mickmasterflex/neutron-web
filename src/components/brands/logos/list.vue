<template>
  <div>
    <div :key="logo.id" v-for="logo in brandLogos">
      <img :src="logo.image" :alt="logo.alt"/>
      <p>Version: {{logo.scale_name}}</p>
      <p>Alt: {{logo.alt}}</p>
      <p>Height: {{logo.height}}</p>
      <p>Width: {{logo.width}}</p>
      <p>Size: {{logo.size}} bytes</p>
      <button @click="runDelete(logo.id)">delete</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      brandLogos: 'getCurrentBrandLogos'
    })
  },
  methods: {
    ...mapActions({
      deleteBrandLogo: 'deleteBrandLogo'
    }),
    runDelete (id) {
      this.deleteBrandLogo(id)
    }
  }
}
</script>
