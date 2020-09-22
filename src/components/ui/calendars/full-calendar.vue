<template>
  <div class="full-calendar mx-auto block relative">
    <div class="card card-border rounded-xl full-calendar--heading absolute w-full">
      <div class="full-calendar--heading-details">
        <slot name="heading-details"></slot>
      </div>
    </div>
    <v-calendar :masks="{ title: 'MMM YYYY' }" title-position="right" :attributes="attributes" is-expanded ref="calendar" @update:to-page="$emit('update:to-page', $event)" @update:from-page="$emit('update:from-page', $event)">
      <template v-slot:header-left-button><span class="btn btn-circle btn-md btn-blue"><font-awesome-icon icon="angle-left"></font-awesome-icon></span></template>
      <template v-slot:header-right-button><span class="btn btn-circle btn-md btn-blue"><font-awesome-icon icon="angle-right"></font-awesome-icon></span></template>
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
export default {
  props: {
    attributes: Array
  }
}
</script>
