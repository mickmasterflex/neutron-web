<template>
  <div class="flex flex-row justify-between items-center mb-5">
    <div class="flex flex-row items-center">
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
