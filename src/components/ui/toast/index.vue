<template>
  <li :class="`bg-${toast.color}-500 border-${toast.color}-600 toast mb-1`" :key="toast.id">
    <div class="flex flex-row items-center pb-1">
      <span class="w-5 ml-1 mt-1">
        <font-awesome-icon size="lg" :icon="toast.icon" :class="`text-${toast.color}-800`"></font-awesome-icon>
      </span>
      <h3 class="text-lg text-white ml-4 flex-grow">{{toast.heading}}</h3>
      <span @click="close" :class="`text-${toast.color}-700 hover:text-${toast.color}-900 cursor-pointer transition-colors duration-200 text-3xl font-hairline leading-none`">&times;</span>
    </div>
    <div class="ml-10" v-if="toast.content">
      <p v-show="!showContent" @click="toggleContent( true )" :class="`underline cursor-pointer text-${toast.color}-900 hover:text-${toast.color}-800 block`">Show details</p>
      <p v-show="showContent" :class="`text-${toast.color}-900`">{{toast.content}}</p>
    </div>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      showContent: false
    }
  },
  props: {
    toast: Object,
    timeout: {
      type: Number,
      default: 10000
    }
  },
  methods: {
    ...mapMutations({
      remove: 'REMOVE_TOAST'
    }),
    close () {
      this.showToast = false
      this.remove(this.toast.id)
    },
    toggleContent (bool) {
      this.showContent = bool
    }
  },
  mounted () {
    setTimeout(() => { this.close() }, this.timeout)
  }
}
</script>

<style>
  .toast {
    @apply w-full border-2 rounded-lg p-4;
  }
</style>
