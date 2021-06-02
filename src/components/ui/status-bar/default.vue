<template>
  <label v-show="show" :class="`bg-${color}-500 text-white px-4 py-2 w-full block`">
    <transition :enter-active-class="enterActiveClass">
      <div class="copy" v-show="show">
        <span class="font-bold flex flex-row justify-between items-center">
          <span>
            <font-awesome-icon v-if="icon" :icon="icon" class="mr-2"></font-awesome-icon>
            <slot name="content"/>
          </span>
          <slot name="action"/>
        </span>
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
    show: {
      type: Boolean,
      required: true
    },
    enterActiveClass: {
      type: String,
      default: 'animate__animated animate__headShake'
    }
  }
}
</script>
