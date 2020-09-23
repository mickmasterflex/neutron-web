<template>
  <div>
    <div :class="`${headerClass} full-calendar--header card card-border rounded-xl flex flex-row justify-between items-center`">
      <div class="flex flex-row items-center">
        <pop-over-ref id="month-picker" visibility="click" placement="bottom-start" :isInteractive="true" class="ml-24">
          <div class="text-link text-3xl flex flex-row">
            <span class="block md:hidden lg:hidden xl:hidden">{{ calendarData.shortMonthLabel }}</span>
            <span class="hidden md:block lg:block xl:block">{{ calendarData.monthLabel }}</span>
            <span class="ml-1">{{ calendarData.yearLabel }}</span>
          </div>
        </pop-over-ref>
      </div>
      <slot name="header-right"></slot>
    </div>
    <pop-over id="month-picker" content-class="vc-rounded vc-text-xs vc-text-white vc-font-medium vc-bg-gray-800 vc-border vc-border-gray-700 vc-px-2 vc-py-1 vc-shadow">
      <calendar-nav @input="calendarRefs.calendar.move($event)" :validator="() => true" :value="{month: calendarData.month, year: calendarData.year}"></calendar-nav>
    </pop-over>
  </div>
</template>

<script>
import popOver from 'v-calendar/src/components/Popover'
import popOverRef from 'v-calendar/src/components/PopoverRef'
import calendarNav from 'v-calendar/src/components/CalendarNav.vue'

export default {
  props: {
    calendarData: Object,
    calendarRefs: Object,
    headerClass: String
  },
  components: {
    'pop-over': popOver,
    'pop-over-ref': popOverRef,
    'calendar-nav': calendarNav
  }
}
</script>
