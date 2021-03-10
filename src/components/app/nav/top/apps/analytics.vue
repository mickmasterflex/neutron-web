<template>
  <ul class="flex flex-row">
    <top-nav-item label="Lead Data" route="Analytics" :active="activeTab === 'lead-data'"></top-nav-item>
    <top-nav-item label="Buyer Stats" route="BuyerStats" :active="activeTab === 'buyer-stats'" :query="$route.query"></top-nav-item>
    <top-nav-item label="Partner Stats" route="PartnerStats" :active="activeTab === 'partner-stats'" :query="$route.query"></top-nav-item>
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
