<template>
  <ul class="flex flex-row">
    <top-nav-item label="Home" route="Config" :active="activeTab === 'home'"></top-nav-item>
    <top-nav-item label="Pricing Tiers" route="PricingTiers" :active="activeTab === 'pricing-tiers'"></top-nav-item>
  </ul>
</template>

<script>
import topNavItem from '@/components/ui/nav/top/nav-item'

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
