<template>
  <panel-template
    title="Lead Caps"
    contentClass="relative"
    class="col-span-2"
    :show-loader="loadingCaps"
    :loading-text="loadingCapsText">
    <template v-slot:content>
      <lead-caps/>
    </template>
  </panel-template>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import leadCaps from '@/components/caps/'

export default {
  props: {
    capsParentId: {
      type: Number,
      required: true
    },
    capsParentType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      loadingCaps: 'getCapsFetchLoading',
      loadingCapsText: 'getCapsFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      setCapsCalendarEndpoint: 'setCapsCalendarEndpoint',
      capStateReset: 'capStateReset'
    })
  },
  created () {
    this.setCapsCalendarEndpoint({
      id: this.capsParentId,
      type: this.capsParentType
    })
  },
  destroyed () {
    this.capStateReset()
  },
  components: {
    'lead-caps': leadCaps
  }
}
</script>
