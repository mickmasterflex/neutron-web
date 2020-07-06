<template>
  <ul class="flex flex-row">
    <top-nav-item label="Clients" route="Relationships" :active="activeTab === 'clients'"></top-nav-item>
  </ul>
</template>

<script>
import topNavItem from '@/components/ui/nav/top/nav-item'

export default {
  props: {
    activeTab: {
      type: String,
      default: 'clients'
    }
  },
  components: {
    'top-nav-item': topNavItem
  }
}
</script>
