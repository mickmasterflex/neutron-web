<template>
  <panel-modal :show="showModal" @close="close">
    <template v-slot:header>
      <span v-if="day !== null">{{day.day}}</span>
    </template>
    <template v-slot:body>
      hi
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green" @click="submitForm"><font-awesome-icon icon="check"></font-awesome-icon> Save Changes</button>
    </template>
  </panel-modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import panelModal from '@/components/ui/modals/panel-modal'

export default {
  data () {
    return {
      limit: ''
    }
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_UPDATE_DAY_CAP_MODAL'
    }),
    close () {
      this.limit = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {}
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateDayCapModal',
      day: 'getSelectedCapDay',
      caps: 'getCurrentCaps'
    })
  },
  components: {
    'panel-modal': panelModal
  }
}
</script>
