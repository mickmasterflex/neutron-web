<template>
  <text-field :field_class="$attrs.field_class + ` w-56 pr-8`"
              :field_wrap_class="$attrs.field_wrap_class + ` flex flex-row items-center`"
              v-bind="$attrs">
    <span class="ml-2">
      <slot></slot>
    </span>
  </text-field>
</template>
