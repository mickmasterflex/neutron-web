<template>
  <div class="bg-gray-900 rounded-xl w-full p-8 border-3 border-gray-400">
    <slot name="breadcrumbs">
      <bread-crumbs :breadcrumbs="breadcrumbs"></bread-crumbs>
    </slot>
    <div class="grid grid-cols-1 items-center md:grid-cols-2">
      <slot name="hud-content"></slot>
    </div>
  </div>
</template>

<script>
import breadcrumbs from '@/components/ui/breadcrumbs'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      breadcrumbs: 'getCurrentBreadCrumbs'
    })
  },
  components: {
    'bread-crumbs': breadcrumbs
  }
}
</script>
