<template>
  <div>
    <component
      :is="currentCapsModal"
      :showModal="showModal"
      @modal-after-leave="setModalComponent(null)"/>
    <caps-calendar class="my-3" v-if="capsEndpoint"/>
    <table-empty-state heading="Loading Caps" v-else/>
  </div>
</template>

<script>
import capsCalendar from '@/components/caps/calendar'
import dayCapCreate from '@/components/caps/day/create'
import dayCapUpdate from '@/components/caps/day/update'
import dayCapBulkUpdate from '@/components/caps/day/bulk/update'
import monthCapCreate from '@/components/caps/month/create'
import monthCapUpdate from '@/components/caps/month/update'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      currentCapsModal: null,
      showModal: false
    }
  },
  computed: {
    ...mapGetters({
      capsEndpoint: 'getCapsCalendarEndpoint',
      dayCapCreateModalShown: 'getShowCreateDayCapModal',
      dayCapUpdateModalShown: 'getShowUpdateDayCapModal',
      monthCapCreateModalShown: 'getShowCreateMonthCapModal',
      monthCapUpdateModalShown: 'getShowUpdateMonthCapModal',
      bulkDayCapModalShown: 'getShowBulkDayCapModal'
    })
  },
  watch: {
    dayCapCreateModalShown () {
      this.setModalComponentAndVisibility(dayCapCreate, this.dayCapCreateModalShown)
    },
    dayCapUpdateModalShown () {
      this.setModalComponentAndVisibility(dayCapUpdate, this.dayCapUpdateModalShown)
    },
    monthCapCreateModalShown () {
      this.setModalComponentAndVisibility(monthCapCreate, this.monthCapCreateModalShown)
    },
    monthCapUpdateModalShown () {
      this.setModalComponentAndVisibility(monthCapUpdate, this.monthCapUpdateModalShown)
    },
    bulkDayCapModalShown () {
      this.setModalComponentAndVisibility(dayCapBulkUpdate, this.bulkDayCapModalShown)
    }
  },
  methods: {
    async setModalComponentAndVisibility (component, visibility) {
      if (visibility === true) {
        this.setModalComponent(component).then(() => {
          this.setModalVisibility(visibility)
        })
      } else {
        this.setModalVisibility(visibility)
      }
    },
    async setModalVisibility (visibility) {
      this.showModal = visibility
    },
    async setModalComponent (component) {
      this.currentCapsModal = component
    }
  },
  components: {
    'caps-calendar': capsCalendar
  }
}
</script>
