<template>
  <panel-template title="Logo">
    <template v-slot:action>
      <delete-logo></delete-logo>
    </template>
    <template v-slot:content>
      <div :key="logo.id" v-for="logo in campusLogos" class="image-meta-li">
        <div class="img-container">
          <img :src="logo.image" :alt="logo.alt"/>
        </div>
        <ul class="img-meta">
          <li class="h4 capitalize">{{logo.scale_name}}</li>
          <li>Alt: {{logo.alt}}</li>
          <li>Height: {{logo.height}}</li>
          <li>Width: {{logo.width}}</li>
          <li>Size: {{logo.total_size}} bytes</li>
        </ul>
      </div>
    </template>
  </panel-template>
</template>

<script>
import { mapGetters } from 'vuex'
import deleteLogo from '@/components/campuses/logos/delete'

export default {
  computed: {
    ...mapGetters({
      campusLogos: 'getCurrentCampusLogos'
    })
  },
  components: {
    'delete-logo': deleteLogo
  }
}
</script>
