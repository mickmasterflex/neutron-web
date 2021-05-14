<template>
  <button class="btn btn-circle btn-hollow-blue mr-1" @click="showModalSetEndpoint()">
    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
  </button>
</template>

<script>
import { plural } from '@/mixins/plural'
import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      setCurrentCapParentType: 'SET_CURRENT_CAPS_PARENT_TYPE',
      showCapsModal: 'SHOW_CAPS_MODAL'
    }),
    ...mapActions({
      setCapsCalendarEndpoint: 'setCapsCalendarEndpoint'
    }),
    showModalSetEndpoint () {
      this.setCapsCalendarEndpoint({
        id: this.capsParentId,
        type: this.capsParentType
      })
      this.$nextTick(() => {
        this.showCapsModal()
      })
    }
  },
  mixins: [plural],
  props: {
    capsParentType: {
      type: String,
      validator: (value) => {
        return ['buyers', 'partners', 'offer-contracts', 'relations'].includes(value)
      },
      required: true
    },
    capsParentId: {
      type: Number,
      required: true
    }
  }
}
</script>
