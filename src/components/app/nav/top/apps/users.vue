<template>
  <ul class="flex flex-row">
    <top-nav-item label="My Account" route="MyAccount" :active="activeTab === 'my-account'"></top-nav-item>
    <top-nav-item label="Users" route="Users" :active="activeTab === 'users'"></top-nav-item>
  </ul>
</template>

<script>
import topNavItem from '@/components/app/nav/top/nav-item'

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
