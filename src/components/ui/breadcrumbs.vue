<template>
  <ul v-if="breadcrumbs" class="flex flex-row">
    <li
      class="text-white mr-3"
      v-for="(crumb, index) in breadcrumbs"
      :key="'breadcrumb-' + index">
      <router-link :to="{ name: crumb.name, params: crumb.params }">{{ crumb.text }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array
    }
  }
}
</script>
