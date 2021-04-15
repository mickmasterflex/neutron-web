<template>
  <div class="full-calendar mx-auto block relative">
    <v-calendar
      title-position="right"
      :attributes="attributes"
      is-expanded ref="calendar"
      @update:to-page="$emit('update:to-page', $event)"
      @update:from-page="$emit('update:from-page', $event)">
      <template v-slot:header="slotProps">
        <slot name="header" :calendarData="slotProps" :calendarRefs="$refs">
          <calendar-header :calendarData="slotProps" :calendarRefs="$refs"></calendar-header>
        </slot>
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
import fullCalendarHeader from '@/components/ui/calendars/full-calendar/header'

export default {
  props: {
    attributes: Array
  },
  components: {
    'calendar-header': fullCalendarHeader
  }
}
</script>

<style>
  .full-calendar .vc-container {
    background: none;
    border: none;
  }

  /* Arrow Positioning and Resets */
  .full-calendar .vc-arrows-container > *:hover { background: none; opacity: 1 }
  .full-calendar .vc-weeks { @apply mt-4 }

  /* Days out of scope of month */
  .full-calendar .in-prev-month > div,
  .full-calendar .in-next-month > div { opacity: 1 }

  /* Sizing Days and Calendar */
  .full-calendar { max-width: 600px; }

  .full-calendar--day {
    min-height: 120px;
    width: 75px;
  }

  @media screen and (min-width: 1024px) {
    .full-calendar {
      max-width: 771px;
    }
    .full-calendar--day {
      min-height: 115px;
      width: 100px;
    }
  }

  @media screen and (min-width: 1280px) {
    .full-calendar {
      max-width: 1013px;
    }
    .full-calendar--day {
      min-height: 135px;
      width: 135px;
    }
  }

  /* Full Calendar Header */
  .full-calendar .vc-arrows-container,
  .full-calendar--header {
    padding: 2rem 1.25rem;
    height: 120px;
  }
  .full-calendar .vc-popover-caret { opacity: 0 }
</style>
