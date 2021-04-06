<template>
  <ul class="flex flex-row">
    <top-nav-item label="Pricing Tiers" route="PricingTiers" :active="activeTab === 'pricing-tiers'"></top-nav-item>
    <top-nav-item label="Channels" route="Channels" :active="activeTab === 'channels'"></top-nav-item>
    <top-nav-item label="Reasons" route="Reasons" :active="activeTab === 'reasons'"></top-nav-item>
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
