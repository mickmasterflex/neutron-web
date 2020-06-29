<template>
  <ul class="flex flex-row">
    <top-nav-item label="Home" route="Analytics" :active="activeTab === 'home'"></top-nav-item>
  </ul>
</template>

<script>
export default {
  props: {
    activeTab: {
      type: String,
      default: 'home'
    }
  }
}
</script>
