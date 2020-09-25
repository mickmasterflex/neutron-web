<template>
  <panel-modal :show="showModal" @close="close">
    <template v-slot:header>
      <p v-if="monthCap">{{currentCapMonthFormats.MM_YYYY}}</p>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="limit" rules="required|integer|min_value:0" field_id="limit" field_label="Month Cap"></v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green" @click="submitForm"><font-awesome-icon icon="plus"></font-awesome-icon> Create Cap</button>
    </template>
  </panel-modal>
</template>

<script>
import { setResponseErrors } from '@/mixins/set-response-errors'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import panelModal from '@/components/ui/modals/panel-modal'

export default {
  data () {
    return {
      limit: ''
    }
  },
  mixins: [setResponseErrors, enterKeyListener],
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_MONTH_CAP_MODAL',
      resetCapMonth: 'RESET_SELECTED_CAP_MONTH'
    }),
    ...mapActions({
      create: 'createMonthCap'
    }),
    close () {
      this.limit = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            date: this.monthCap.date,
            limit: this.limit,
            parent: this.parent
          }).then(() => {
            this.close()
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateMonthCapModal',
      monthCap: 'getSelectedCapMonth',
      parent: 'getCurrentCapParent',
      currentCapMonthFormats: 'getCurrentCapMonthFormats'
    })
  },
  components: {
    'panel-modal': panelModal
  },
  destroyed () {
    this.resetCapMonth()
  }
}
</script>
