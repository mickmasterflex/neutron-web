<template>
  <div class="bg-gray-900 rounded-xl w-full p-3 border-3 border-gray-400 shadow-inner">
    <slot name="breadcrumbs">
      <bread-crumbs :breadcrumbs="breadcrumbs"></bread-crumbs>
    </slot>
    <div class="grid grid-cols-1 items-center md:grid-cols-2 p-4">
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
