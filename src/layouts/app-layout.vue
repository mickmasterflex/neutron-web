<template>
  <div class="min-h-screen flex flex-row pl-3">
    <div id="nav" class="app-side-nav min-h-screen flex flex-col">
      <proton-logo class="app-side-nav-logo mt-6 mb-10 pl-2"></proton-logo>
      <side-nav-item :active="activeApp === 'dashboard'" icon="th-large" route="Dashboard" label="Dashboard"></side-nav-item>
      <side-nav-item :active="activeApp === 'analytics'" icon="chart-area" route="Analytics" label="Analytics"></side-nav-item>
      <side-nav-item :active="activeApp === 'relationships'" icon="dna" route="Relationships" label="Relationships"></side-nav-item>
      <side-nav-item :active="activeApp === 'products'" icon="tag" route="Brands" label="Products"></side-nav-item>
      <side-nav-item :active="activeApp === 'config'" icon="cog" route="PricingTiers" label="Config"></side-nav-item>
<!--      <side-nav-item :active="activeApp === 'utilities'" icon="wrench" route="Utilities" label="Utilities"></side-nav-item>-->
      <side-nav-item :active="activeApp === 'users'" icon="key" route="Users" label="Users"></side-nav-item>
    </div>
    <div class="w-full min-h-screen pt-2">
      <div class="flex flex-row justify-between items-center pr-4">
        <top-nav></top-nav>
        <logout-button class="pb-2"></logout-button>
      </div>
      <div class="bg-gray-100 h-full">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import logoutButton from '@/components/authentication/logout'
import logo from '@/components/ui/logo'
import sideNavItem from '@/components/app/nav/side/nav-item'
import topNav from '@/components/app/nav/top/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    'logout-button': logoutButton,
    'proton-logo': logo,
    'side-nav-item': sideNavItem,
    'top-nav': topNav
  },
  computed: {
    ...mapGetters({
      activeApp: 'getActiveApp'
    })
  }
}
</script>

<style>
  .app-side-nav {
    width: 200px;
  }
  .app-side-nav-logo {
    width: 150px;
  }
</style>
