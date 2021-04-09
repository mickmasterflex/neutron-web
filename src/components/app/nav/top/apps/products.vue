<template>
  <ul class="flex flex-row">
    <top-nav-item label="Product Mgmt" route="Brands" :active="activeTab === 'product-mgmt'"></top-nav-item>
  </ul>
</template>

<script>
import topNavItem from '@/components/app/nav/top/nav-item'

export default {
  props: {
    activeTab: {
      type: String,
      default: 'product-mgmt'
    }
  },
  components: {
    'top-nav-item': topNavItem
  }
}
</script>
