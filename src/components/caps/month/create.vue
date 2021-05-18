<template>
  <panel-modal :show="showModal" @close="close">
    <template v-slot:header>
      <p v-if="monthCap">{{currentCapMonthFormats.MM_YYYY}}</p>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field
            ref="focusField"
            v-model="limit"
            rules="required|integer|min_value:0"
            field_id="limit"
            field_label="Month Cap"
            :field_disabled="loading"
          />
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green" @click="submitForm" :disabled="loading">
        <font-awesome-icon icon="spinner" pulse v-if="loadingPost"></font-awesome-icon>
        <font-awesome-icon icon="plus" v-else></font-awesome-icon> Create Cap
      </button>
    </template>
  </panel-modal>
</template>

<script>
import { setResponseErrors } from '@/mixins/set-response-errors'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import panelModal from '@/components/ui/modals/panel-modal'

export default {
  props: {
    showModal: {
      default: false,
      required: true
    }
  },
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
  watch: {
    showModal () {
      if (this.showModal === true) {
        this.$refs.focusField.focusOnField()
      }
    }
  },
  computed: {
    ...mapGetters({
      monthCap: 'getSelectedCapMonth',
      parent: 'getCurrentCapsParentId',
      currentCapMonthFormats: 'getCurrentCapMonthFormats',
      loading: 'getCapsLoading',
      loadingPost: 'getCapsPostLoading'
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
