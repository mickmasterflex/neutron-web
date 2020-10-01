<template>
  <div class="panel rounded-xl bg-gray-100 border-gray-200 border-2 relative">
    <div v-show="showLoader" class="absolute inset-0 bg-white opacity-75 flex flex-row items-center justify-center">
      <font-awesome-icon class="text-gray-900 text-lg" icon="spinner" pulse></font-awesome-icon>
      <p class="h4 ml-1 mb-0 pb-0 font-bold">{{ loadingText }}</p>
    </div>
    <div class="flex flex-row justify-between items-center bg-white rounded-t-xl p-3 pl-4" style="height: 70px;">
      <h3 class="h4 m-0">{{title}}</h3>
      <transition v-if="actionTransition" enter-active-class="animate__animated animate__bounceIn" leave-active-class="animate__animated animate__fast animate__fadeOut">
        <slot name="action"></slot>
      </transition>
      <div v-else>
        <slot name="action"></slot>
      </div>
    </div>
    <slot name="tabs"></slot>
    <div :class="`p-4 ${contentClass}`">
      <slot name="content"></slot>
    </div>
    <slot name="footer"></slot>
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
    contentClass: String,
    loadingText: {
      default: 'Loading',
      type: String
    },
    showLoader: {
      default: false,
      type: Boolean
    }
  }
}
</script>
