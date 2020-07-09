<template>
  <ul class="flex flex-row">
    <top-nav-item label="Accounts" route="Users" :active="activeTab === 'accounts'"></top-nav-item>
  </ul>
</template>

<script>
import topNavItem from '@/components/ui/nav/top/nav-item'

export default {
  props: {
    activeTab: {
      type: String,
      default: 'accounts'
    }
  },
  components: {
    'top-nav-item': topNavItem
  }
}
</script>
