<template>
  <panel-modal :show="showModal" @close="close">
    <template v-slot:header>
      <span v-if="day !== null">{{day.month}}/{{day.day}}/{{day.year}}</span>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="limit" rules="required|integer|min_value:0" field_id="limit" field_label="Day Cap"></v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green" @click="submitForm"><font-awesome-icon icon="plus"></font-awesome-icon> Create Cap</button>
    </template>
  </panel-modal>
</template>

<script>
import panelModal from '@/components/ui/modals/panel-modal'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      limit: ''
    }
  },
  mixins: [setResponseErrors],
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
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateDayCapModal',
      day: 'getSelectedCapDay',
      parent: 'getCurrentCapParent'
    })
  },
  components: {
    'panel-modal': panelModal
  }
}
</script>
