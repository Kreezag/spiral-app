<template>
  <div class="event-table__row">
    <div
      v-if="title !== null"
      class="event-table__cell-name"
    >
      <span v-html="title" />
    </div>
    <div class="event-table__cell-value">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>
