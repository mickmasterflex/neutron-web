<template>
  <panel-modal :show="showModal" @close="close">
    <template v-slot:header>
      <span v-if="day !== null">{{day.month}}/{{day.day}}/{{day.year}}</span>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field
            ref="focusField"
            v-model="limit"
            rules="required|integer|min_value:0"
            field_id="limit"
            field_label="Day Cap"
            :field_disabled="loading"
          />
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green" @click="submitForm" :disabled="loading">
        <font-awesome-icon icon="spinner" pulse v-if="loadingPost"></font-awesome-icon>
        <font-awesome-icon icon="plus" v-else></font-awesome-icon> Create Cap</button>
    </template>
  </panel-modal>
</template>

<script>
import panelModal from '@/components/ui/modals/panel-modal'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      limit: ''
    }
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_DAY_CAP_MODAL'
    }),
    ...mapActions({
      create: 'createDayCap'
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
            date: this.day.id,
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
      showModal: 'getShowCreateDayCapModal',
      day: 'getSelectedCapDay',
      parent: 'getCurrentCapParent',
      loading: 'getCapsLoading',
      loadingPost: 'getCapsPostLoading'
    })
  },
  components: {
    'panel-modal': panelModal
  }
}
</script>
