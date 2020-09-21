<template>
  <ul class="flex flex-row">
    <top-nav-item label="Home" route="Dashboard" :active="activeTab === 'home'"></top-nav-item>
  </ul>
</template>

<script>
import topNavItem from '@/components/app/nav/top/nav-item'

export default {
  props: {
    activeTab: {
      type: String,
      default: 'home'
    }
  },
  components: {
    'top-nav-item': topNavItem
  }
}
</script>
