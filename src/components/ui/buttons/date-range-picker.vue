<template>
  <v-date-picker :value="dateRange" is-range  @input="$emit('input', $event)">
    <template v-slot="{ inputValue, togglePopover }">
      <div class="flex flex-row items-center bg-gray-200 rounded-full p-1 cursor-pointer"
           @click="togglePopover({ placement: 'bottom-start' })">
        <button class="btn-blue btn btn-circle btn-md text-sm">
          <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
        </button>
        <span class="font-bold px-2 text-gray-800">
          {{ new Date(inputValue.start).toDateString() }} <font-awesome-icon icon="arrow-right" class="text-gray-400"></font-awesome-icon> {{ new Date(inputValue.end).toDateString() }}
        </span>
      </div>
    </template>
  </v-date-picker>
</template>

<script>
export default {
  props: {
    dateRange: Object
  }
}
</script>
