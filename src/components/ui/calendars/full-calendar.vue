<template>
  <div class="full-calendar mx-auto block">
    <v-calendar
      class="bg-gray-200 border-2 rounded-lg border-gray-200"
      :attributes="attributes"
      title-position="left"
      is-expanded>
      <template v-slot:day-content="slotProps">
        <div class="card m-1 p-2 border border-gray-300 full-calendar--day flex flex-col items-stretch">
            <span class="full-calendar--day-title flex flex-row items-center border-b border-gray-200 px-1">
              <p class="font-bold">{{ slotProps.day.day }}</p>
            </span>
          <span class="flex flex-row items-center justify-center flex-grow pb-2">
              <slot name="day-inner" v-bind:day="slotProps.day"></slot>
          </span>
        </div>
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
  .full-calendar { max-width: 943px; }
  .full-calendar .vc-title { @apply text-xl text-gray-900 font-medium pb-2 }
  .full-calendar .in-prev-month,
  .full-calendar .in-next-month { display: none }
  .full-calendar .vc-header { @apply rounded-t-lg bg-white border-b-2 border-gray-200 }

  .full-calendar--day {
    height: 135px;
    width: 125px;
  }

  .full-calendar--day-title {
    height: 30px;
  }
</style>
