<template>
  <span @click="$emit('table-link-click')" class="transition duration-200 ease-in-out bg-white-500 hover:bg-gray-700 hover:text-white rounded-lg border-b-2 border-r-2 border-t border-l px-2 py-1 border-gray-800 cursor-pointer">
    <slot/>
  </span>
</template>
