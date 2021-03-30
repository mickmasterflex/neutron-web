<template>
  <div class="col-auto xl:col-span-2">
    <transition-group enter-active-class="animate__animated animate__fadeIn"
                      leave-active-class="animate__animated animate__fadeOut animate__faster"
                      class="flex flex-row flex-wrap items-end justify-end"
    >
      <slot></slot>
    </transition-group>
  </div>
</template>
