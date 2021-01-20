<template>
  <div class="panel rounded-xl bg-gray-100 border-gray-200 border-2 relative">
    <transition enter-active-class="animate__animated animate__faster animate__fadeIn" leave-active-class="animate__animated animate__faster animate__fadeOut">
      <div v-show="showLoader" class="absolute inset-0 bg-white bg-opacity-75 flex flex-row items-center justify-center rounded-xl z-10">
        <div class="bg-gray-800 text-white flex flex-row items-center py-2 px-3 rounded-lg w-fit-content">
          <font-awesome-icon class="" icon="spinner" pulse></font-awesome-icon>
          <p class="ml-1 mb-0 pb-0 font-bold">{{ loadingText }}</p>
        </div>
      </div>
    </transition>
    <div class="flex flex-row justify-between items-center bg-white rounded-t-xl p-3 pl-4" style="min-height: 70px;">
      <h3 class="h4 m-0">{{title}}<span class="font-light text-gray-600 m-0 ml-2" v-if="subtitle">{{subtitle}}</span></h3>
      <transition v-if="actionTransition" enter-active-class="animate__animated animate__bounceIn" leave-active-class="animate__animated animate__fast animate__fadeOut">
        <slot name="action"></slot>
      </transition>
      <div v-else class="flex flex-row">
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
    subtitle: {
      type: String
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
