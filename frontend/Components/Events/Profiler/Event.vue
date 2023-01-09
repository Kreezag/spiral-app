<template>
  <Event
    :event="event"
    class="event--profiler"
  >
    <NuxtLink
      :to="event.route.show"
      class="event--profiler__link"
    >
      <Cards :cost="event.peaks" />
    </NuxtLink>
  </Event>
</template>

<script>
import Cards from "./_partials/Cards"
import Event from "../Event"

export default {
  components: {Event, Cards},
  props: {
    event: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.event--profiler {
  &__link {

  }
}
</style>
