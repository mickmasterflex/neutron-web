<template>
   <span v-if="caps.month_caps.length || caps.day_caps.length">{{ caps.month_caps.length }} Month,
        {{ caps.day_caps.length }} Day
    </span>
  <span v-else class="italic text-gray-500">No Caps Set</span>
</template>

<script>
export default {
  props: {
    caps: Object
  }
}
</script>
