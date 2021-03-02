<template>
  <ul v-if="breadcrumbs" class="flex flex-row flex-wrap bg-gray-800 shadow-md rounded-full px-2">
    <li
      class="flex flex-row items-center"
      v-for="(crumb, index) in breadcrumbs"
      :key="'breadcrumb-' + index">
      <router-link
        :to="{ name: crumb.name, params: crumb.params }"
        class="inline-block p-2 cursor-pointer transition-colors duration-100 text-sm"
        :class="index + 1 === breadcrumbs.length ? 'text-gray-500 hover:text-gray-100' : 'text-gray-300 hover:text-white'"
      >{{ crumb.text }}</router-link>
      <font-awesome-icon v-if="index + 1 !== breadcrumbs.length" icon="angle-right" class="text-xl text-gray-900"></font-awesome-icon>
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
