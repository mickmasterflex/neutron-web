<template>
  <div class="panel rounded-xl bg-gray-100 border-gray-200 border-2">
    <div class="flex flex-row justify-between items-center bg-white rounded-t-xl p-3 pl-4" style="height: 70px;">
      <h3 class="h4 m-0">{{title}}</h3>
      <transition v-if="actionTransition" enter-active-class="animate__animated animate__bounceIn" leave-active-class="animate__animated animate__fast animate__fadeOut">
        <slot name="action"></slot>
      </transition>
      <div v-else>
        <slot name="action"></slot>
      </div>
    </div>
    <div :class="`p-4 ${contentClass}`">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Panel Title'
    },
    actionTransition: {
      type: Boolean,
      default: false
    },
    contentClass: String
  }
}
</script>

<style scoped>
  .panel:not(:first-of-type) {
    @apply mt-4
  }
</style>
