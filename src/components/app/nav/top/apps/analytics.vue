<template>
  <ul class="flex flex-row">
    <top-nav-item label="Lead Data" route="Analytics" :active="activeTab === 'lead-data'"></top-nav-item>
  </ul>
</template>

<script>
import topNavItem from '@/components/app/nav/top/nav-item'

export default {
  props: {
    activeTab: {
      type: String,
      default: 'lead-data'
    }
  },
  components: {
    'top-nav-item': topNavItem
  }
}
</script>
