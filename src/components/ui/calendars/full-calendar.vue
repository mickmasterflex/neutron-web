<template>
  <div class="full-calendar mx-auto block">
    <v-calendar
      :attributes="attributes"
      is-expanded
      ref="calendar">
      <template v-slot:header-left-button><span class="btn btn-circle btn-md btn-blue"><font-awesome-icon icon="angle-left"></font-awesome-icon></span></template>
      <template v-slot:header-right-button><span class="btn btn-circle btn-md btn-blue"><font-awesome-icon icon="angle-right"></font-awesome-icon></span></template>
      <template v-slot:day-content="slotProps">
        <div v-if="slotProps.day.inMonth" class="card m-1 p-2 border border-gray-300 full-calendar--day flex flex-col items-stretch">
            <span class="full-calendar--day-title flex flex-row items-center border-b border-gray-200 px-1">
              <p class="font-bold">{{ slotProps.day.day }}</p>
            </span>
          <span class="flex flex-row items-center justify-center flex-grow lg:pb-2">
              <slot name="day-inner" v-bind:day="slotProps.day"></slot>
          </span>
        </div>
        <div v-if="slotProps.day.inPrevMonth || slotProps.day.inNextMonth" class="full-calendar--day m-1 rounded-lg bg-gray-200"></div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
export default {
  props: {
    attributes: Array
  }
}
</script>

<style>
  .full-calendar .vc-container {
    background: none;
    border: none
  }

  /* Heading Typography */
  .full-calendar .vc-title { @apply text-2xl text-gray-900 font-bold }

  /* Arrow Positioning and Resets */
  .full-calendar .vc-arrows-container > *:hover { background: none; opacity: 1 }
  .full-calendar .vc-arrows-container > :first-child { margin-left: 25% }
  .full-calendar .vc-arrows-container > :last-child { margin-right: 25% }
  .full-calendar .vc-header { @apply mb-4 }

  /* Days out of scope of month */
  .full-calendar .in-prev-month > div,
  .full-calendar .in-next-month > div { opacity: 1 }

  /* Sizing Days and Calendat */
  .full-calendar { max-width: 600px; }

  .full-calendar--day {
    height: 85px;
    width: 75px;
  }

  .full-calendar--day-title {
    height: 20px;
  }

  @media screen and (min-width: 1024px) {
    .full-calendar {
      max-width: 771px;
    }
    .full-calendar--day {
      height: 115px;
      width: 100px;
    }
    .full-calendar--day-title {
      height: 30px;
    }
  }

  @media screen and (min-width: 1280px) {
    .full-calendar {
      max-width: 943px;
    }
    .full-calendar--day {
      height: 135px;
      width: 125px;
    }
  }
</style>
