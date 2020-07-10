<template>
  <label v-show="show" :class="`bg-${color}-500 text-${color}-900 px-4 py-2 w-full block rounded-full`">
    <transition enter-active-class="animate__animated animate__headShake">
      <div class="copy" v-show="show">
        <font-awesome-icon v-if="icon" :icon="icon" class="mr-2"></font-awesome-icon>
        <span class="font-bold">{{copy}}</span>
      </div>
    </transition>
  </label>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    copy: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>
