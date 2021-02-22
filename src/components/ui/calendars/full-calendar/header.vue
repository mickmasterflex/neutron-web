<template>
  <div class="p-1">
    <div :class="`${headerClass} full-calendar--header card card-border rounded-xl flex flex-row justify-between items-center`">
      <div class="flex flex-row items-center">
        <div class="ml-24 text-3xl flex flex-row text-gray-900">
          <span class="block lg:hidden xl:hidden">{{ calendarData.shortMonthLabel }}</span>
          <span class="hidden lg:block xl:block">{{ calendarData.monthLabel }}</span>
          <span class="ml-1">{{ calendarData.yearLabel }}</span>
        </div>
      </div>
      <slot name="header-right" :date="{month: calendarData.month, year: calendarData.year}"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    calendarData: Object,
    calendarRefs: Object,
    headerClass: String
  }
}
</script>
