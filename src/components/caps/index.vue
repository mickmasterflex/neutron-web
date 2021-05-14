<template>
  <div>
    <day-cap-create/>
    <day-cap-update/>
    <day-cap-bulk-update/>
    <month-cap-create/>
    <month-cap-update/>
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
  computed: {
    ...mapGetters({
      capsEndpoint: 'getCapsCalendarEndpoint',
      parentType: 'getCurrentCapsParentType',
      dayCaps: 'getCurrentDayCaps',
      monthCaps: 'getCurrentMonthCaps'
    })
  },
  watch: {
    // dayCaps () {
    //   const updatedParent = { ...this.parentObject }
    //   updatedParent.caps.day_caps = this.dayCaps.filter(cap => cap.id !== null)
    //   this.capParentUpdate(this.parentType, updatedParent)
    // },
    // monthCaps () {
    //   const updatedParent = { ...this.parentObject }
    //   updatedParent.caps.month_caps = this.monthCaps.filter(cap => cap.id !== null)
    //   this.capParentUpdate(this.parentType, updatedParent)
    // }
  },
  components: {
    'caps-calendar': capsCalendar,
    'day-cap-create': dayCapCreate,
    'day-cap-update': dayCapUpdate,
    'day-cap-bulk-update': dayCapBulkUpdate,
    'month-cap-create': monthCapCreate,
    'month-cap-update': monthCapUpdate
  },
  methods: {
    capParentUpdate (capType, updatedParent) {
      const updateMethods = {
        buyers: this.updateBuyer,
        partners: this.updatePartner,
        'offer-contracts': this.updateOffer,
        relations: this.updateContractRelation
      }
      updateMethods[capType](updatedParent)
    }
    // ...mapMutations({
    //   // updateBuyer: 'UPDATE_BUYER',
    //   // updatePartner: 'UPDATE_PARTNER',
    //   // updateOffer: 'UPDATE_OFFER',
    //   // updateContractRelation: 'UPDATE_CONTRACT_RELATION',
    //   resetCurrentCapParent: 'RESET_CURRENT_CAP_PARENT_ID',
    //   resetCurrentDayCaps: 'RESET_CURRENT_DAY_CAPS',
    //   resetCurrentMonthCaps: 'RESET_CURRENT_MONTH_CAPS',
    //   resetCurrentCapMonthFormats: 'RESET_CURRENT_CAP_MONTH_FORMATS',
    //   resetCapsCalendarEndpoint: 'RESET_CAPS_CALENDAR_ENDPOINT',
    //   resetCapsCalendarParams: 'RESET_CAPS_CALENDAR_PARAMS'
    // })
  }
  // destroyed () {
  //   this.resetCurrentCapParent()
  //   this.resetCurrentDayCaps()
  //   this.resetCurrentMonthCaps()
  //   this.resetCurrentCapMonthFormats()
  //   this.resetCapsCalendarEndpoint()
  //   this.resetCapsCalendarParams()
  // }
}
</script>
