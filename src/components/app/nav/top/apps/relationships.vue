<template>
  <ul class="flex flex-row">
    <top-nav-item label="Client MGMT" route="Relationships" :active="activeTab === 'clients'"></top-nav-item>
    <top-nav-item label="Buyer Groups" route="BuyerGroups" :active="activeTab === 'buyer-groups'"></top-nav-item>
  </ul>
</template>

<script>
import topNavItem from '@/components/app/nav/top/nav-item'

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
