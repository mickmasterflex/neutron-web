<template>
  <ul class="flex flex-row">
    <top-nav-item label="Contracts" route="Relationships" :active="activeTab === 'contracts'"></top-nav-item>
  </ul>
</template>

<script>
import topNavItem from '@/components/app/nav/top/nav-item'

export default {
  props: {
    activeTab: {
      type: String,
      default: 'contracts'
    }
  },
  components: {
    'top-nav-item': topNavItem
  }
}
</script>
