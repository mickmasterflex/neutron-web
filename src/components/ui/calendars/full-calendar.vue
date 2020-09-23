<template>
  <div class="full-calendar mx-auto block relative">
    <v-calendar title-position="right" :attributes="attributes" is-expanded ref="calendar" @update:to-page="$emit('update:to-page', $event)" @update:from-page="$emit('update:from-page', $event)">
      <template v-slot:header="slotProps">
        <div class="full-calendar--heading card card-border rounded-xl flex flex-row justify-between items-center">
          <div class="flex flex-row items-center">
            <pop-over-ref id="month-picker" visibility="click" placement="bottom-start" :isInteractive="true" class="ml-24">
              <div class="text-link text-3xl">
                <span>{{ slotProps.shortMonthLabel }}</span>
                <span>{{ slotProps.monthLabel }}</span>
                {{ slotProps.yearLabel }}
              </div>
            </pop-over-ref>
          </div>
          <slot name="heading-details"></slot>
        </div>
        <pop-over id="month-picker" content-class="vc-rounded vc-text-xs vc-text-white vc-font-medium vc-bg-gray-800 vc-border vc-border-gray-700 vc-px-2 vc-py-1 vc-shadow">
          <calendar-nav @input="$refs.calendar.move($event)" :validator="() => true" :value="{month: slotProps.month, year: slotProps.year}"></calendar-nav>
        </pop-over>
      </template>
      <template v-slot:header-left-button>
        <span class="btn btn-circle btn-md btn-glow btn-blue m-1"><font-awesome-icon icon="angle-left"></font-awesome-icon></span>
      </template>
      <template v-slot:header-right-button>
        <span class="btn btn-circle btn-md btn-glow btn-blue"><font-awesome-icon icon="angle-right"></font-awesome-icon></span>
      </template>
      <template v-slot:day-content="slotProps">
        <slot name="day" v-bind:day="slotProps.day">
          <div v-if="slotProps.day.inMonth" class="full-calendar--day card card-border m-1 flex flex-col">
            <span class="full-calendar--day-title flex flex-row items-center px-3 py-4">
              <p class="font-bold text-gray-700 text-lg">{{ slotProps.day.day }}</p>
            </span>
          </div>
        </slot>
        <div v-if="slotProps.day.inPrevMonth || slotProps.day.inNextMonth" class="full-calendar--day m-1 rounded-lg bg-gray-200"></div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
import popOver from 'v-calendar/src/components/Popover'
import popOverRef from 'v-calendar/src/components/PopoverRef'
import calendarNav from 'v-calendar/src/components/CalendarNav.vue'

export default {
  props: {
    attributes: Array
  },
  components: {
    'pop-over': popOver,
    'pop-over-ref': popOverRef,
    'calendar-nav': calendarNav
  },
  data () {
    return {
      popOverProps: {
        isInteractive: true,
        placement: 'bottom-start'
      }
    }
  }
}
</script>
