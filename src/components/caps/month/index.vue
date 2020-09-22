<template>
  <div>
    Sold: {{ month.sold }}
    <span v-if="month.limit">
      Cap: {{ month.limit }}
    </span>
    <button v-else class="btn btn-green" @click="addCap()"><font-awesome-icon icon="plus"></font-awesome-icon> Add Month Cap</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      setSelectedCapMonth: 'SET_SELECTED_CAP_MONTH',
      showCreate: 'SHOW_CREATE_MONTH_CAP_MODAL'
    }),
    addCap () {
      this.setSelectedCapMonth(this.month)
      this.showCreate()
    }
  },
  computed: {
    ...mapGetters({
      month: 'getMonthCapByCurrentMonthDate'
    })
  }
}
</script>
