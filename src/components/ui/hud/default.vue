<template>
  <div class="bg-gray-900 rounded-xl w-full p-3 border-3 border-gray-400 shadow-inner">
    <slot name="breadcrumbs">
      <bread-crumbs :breadcrumbs="breadcrumbs"></bread-crumbs>
    </slot>
    <div class="hud-content p-4" :class="gridClasses">
      <slot name="hud-content"></slot>
    </div>
  </div>
</template>

<script>
import breadcrumbs from '@/components/ui/breadcrumbs'
import { mapGetters } from 'vuex'

export default {
  props: {
    gridClasses: {
      type: String,
      default: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 items-center'
    }
  },
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

<style scoped>
  .hud-content {
    min-height: 142px;
  }
</style>
